package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"os"
	"os/exec"
	"strconv"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)

func generateTestTemplate(l2l1Version string, pcap *Pcap) (err error) {
	bips := pcap.filterBIPs()
	if len(bips) == 0 {
		return
	}

	decoder := pcap.decoder()

	b := strings.Builder{}

	b.WriteString("const messages = [")

	for _, packet := range bips {
		if len(packet.Data) < 8 {
			err = errors.New("bip packet buffer is too smol")
			return
		}

		msgID := decoder.Uint16(packet.Data[2:])
		payload := packet.Data[8:]

		b.WriteString(fmt.Sprintf("{ message: %d, payload: new Uint8Array([", msgID))

		for _, byte := range payload {
			b.WriteString(fmt.Sprintf("%d, ", byte))
		}

		b.WriteString("]) }, ")
	}

	b.WriteString("];\n\n")

	_, err = db.Exec("insert into test_templates(version, template, capture) values (?, ?, ?)", l2l1Version, b.String(), pcap.raw)
	if err != nil {
		return
	}

	slog.Info("Sucessfully added a new SCT", "l2l1Version", l2l1Version)

	return
}

func runAllTests(requestId string, version string) (totalTests int, failedTests int, err error) {
	if err = updateSpecRepo(); err != nil {
		return
	}

	if err = selectL2L1Version(version); err != nil {
		return
	}

	var rows *sql.Rows
	rows, err = db.Query("select id, template from test_templates where version = ?", version)
	if err != nil {
		return
	}

	defer rows.Close()

	slog.Info("Running tests", "reqId", requestId, "l2l1Version", version)

	fails := make([]error, 0, 10)

	for ; rows.Next(); totalTests++ {
		var (
			templateId uint32
			template   string
		)
		if err = rows.Scan(&templateId, &template); err != nil {
			fails = append(fails, err)
			continue
		}

		testNumber := uint32(totalTests + 1)

		slog.Info("Running subtest", "reqId", requestId, "number", testNumber)

		err = runSingleTest(requestId, templateId, testNumber, template, version)
		if err != nil {
			fails = append(fails, err)
		}
	}

	if err = rows.Err(); err != nil {
		return
	}

	if len(fails) != 0 {
		slog.Error("Running tests produced errors", "reqId", requestId, "l2l1Version", version, "errorCount", len(fails))
	}

	slog.Info("Finished running tests", "reqId", requestId, "l2l1Version", version, "totalTests", totalTests)

	failedTests = len(fails)
	err = rows.Err()
	return
}

func runSingleTest(requestId string, templateId, testNumber uint32 , template, version string) (err error) {
	var (
		results TestResults
	)

	defer func() {
		err = handleTestRunError(requestId, templateId, testNumber, version, results, err)
	}()

	var test string
	test, err = generateTestForTemplate(template, version)
	if err != nil {
		return
	}

	var testFile TestFile
	testFile, err = createTestFile(version, test)
	if err != nil {
		return
	}

	defer testFile.File.Close()

	slog.Info("Generated test file", "reqId", requestId, "templateId", templateId, "l2l1Version", version, "filename", testFile.File.Name())

	// Don't really know if those parameters are needed.
	slog.Info("Running test cases...", "reqId", requestId, "templateId", templateId, "l2l1Version", version, "filename", testFile.File.Name())

	results, err = testFile.Run()
	if err != nil {
		return
	}

	msg := fmt.Sprintf("[%d/%d] test cases passed", results.TotalTests - uint(len(results.FailedTests)), results.TotalTests)

	slog.Info(msg, "reqId", requestId, "templateId", templateId, "l2l1Version", version, "filename", testFile.File.Name())

	if len(results.FailedTests) != 0 {
		err = fmt.Errorf("%d out of %d test cases failed", len(results.FailedTests), results.TotalTests)
	}

	return
}

func handleTestRunError(requestId string, templateId, testNumber uint32, version string, results TestResults, testErr error) (err error) {
	var (
		res  sql.Result
	)

	res, err = db.Exec("insert into test_results(request_id, template_id, total_tests) values (?, ?, ?)", requestId, templateId, results.TotalTests)
	if err != nil {
		slog.Error("Could not save test result to the database", "reqId", requestId, "templateId", templateId, "l2l1Version", version, "reason", err)
		err = errors.Join(testErr, err)
		return
	}

	var testResultId int64
	testResultId, err = res.LastInsertId()
	if err != nil {
		slog.Error("Could not get the last insert id", "reqId", requestId, "templateId", templateId, "l2l1Version", version, "reason", err)
		err = errors.Join(testErr, err)
		return
	}

	if testErr == nil {
		return
	}

	res, err = db.Exec("insert into test_failures(result_id, test_number, reason) values (?, ?, ?)", testResultId, testNumber, testErr.Error())
	if err != nil {
		slog.Error("Could not save test failure to the database", "reqId", requestId, "templateId", templateId, "l2l1Version", version, "reason", err)
		err = errors.Join(testErr, err)
		return
	}

	if len(results.FailedTests) == 0 {
		return
	}

	var failId int64
	failId, err = res.LastInsertId()
	if err != nil {
		slog.Error("Could not get the last insert id", "reqId", requestId, "templateId", templateId, "l2l1Version", version, "reason", err)
		err = errors.Join(testErr, err)
		return
	}

	b := strings.Builder{}
	for idx, fail := range results.FailedTests {
		b.WriteRune('(')

		b.WriteString(strconv.Itoa(int(fail.PacketId)))
		b.WriteRune(',')
		b.WriteString(strconv.Itoa(int(fail.Message)))
		b.WriteRune(',')
		b.WriteString(strconv.Itoa(int(failId)))

		b.WriteRune(')')

		if idx != len(results.FailedTests) - 1 {
			b.WriteRune(',')
		}
	}

	q := fmt.Sprintf("insert into test_packet_failures(packet_id, message, failure_id) values %s", b.String())

	_, err = db.Exec(q)
	if err != nil {
		slog.Error("Could not insert packet failures to the database", "reqId", requestId, "templateId", templateId, "l2l1Version", version, "reason", err)
		err = errors.Join(testErr, err)
	}

	return
}

func generateTestForTemplate(template, version string) (test string, err error) {
	var codecs string
	codecs, err = generateCodecsForVersion(version)
	if err != nil {
		return
	}

	test = fmt.Sprintf("%s\n%s\n%s", template, glueCode.Load().(string), codecs)
	return
}

func generateCodecsForVersion(version string) (codecs string, err error) {
	buf := bytes.Buffer{}
	cmd := exec.Command("node", multiGenEntryFile, "--stdout", specRepoPath, version)
	cmd.Stdout = &buf

	if err = tryRunCommandGoodError(cmd); err != nil {
		return
	}

	codecs = buf.String()
	return
}

type TestFile struct {
	File         *os.File
	StdoutBuffer bytes.Buffer
}

func createTestFile(version, test string) (file TestFile, err error) {
	fname := fmt.Sprintf("*.%s.js", version)

	var osFile *os.File
	osFile, err = os.CreateTemp("", fname)
	if err != nil {
		return
	}

	_, err = osFile.Write([]byte(test))
	if err != nil {
		return
	}

	file = TestFile{File: osFile}
	return
}

func (f *TestFile) Run() (results TestResults, err error) {
	cmd := exec.Command("node", f.File.Name())
	cmd.Stdout = &f.StdoutBuffer

	if err = tryRunCommandGoodError(cmd); err != nil {
		return
	}

	err = json.NewDecoder(&f.StdoutBuffer).Decode(&results)
	return
}

type FailedTest struct {
	PacketId uint32 `json:"packetId"`
	Message  uint16 `json:"message"`
	Reason   string `json:"reason"`
}

type TestResults struct {
	TotalTests  uint
	FailedTests []FailedTest
}

const multiGenEntryFile = "./multi-gen/multi-gen/index.js"
