package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"log/slog"
	"net/http"
	"os"
	"path"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/google/uuid"
)

type Capture struct {
	protoVersion uint8
	l2l1Version  string
	body         []byte
}

const supportedProtocolVersion = 1

func parseCapture(data []byte) (capture Capture, err error) {
	if len(data) < 3 {
		err = errors.New("capture buffer is too smol")
		return
	}

	capture.protoVersion = data[0]
	if capture.protoVersion != supportedProtocolVersion {
		err = fmt.Errorf("unsupported protocol version %d", capture.protoVersion)
		return
	}

	l2l1Len := uint16(data[1])<<8 | uint16(data[2])

	data = data[3:]
	if len(data) < int(l2l1Len) {
		err = errors.New("capture body is too smol")
		return
	}

	capture.l2l1Version = string(data[:l2l1Len])
	capture.body = data[l2l1Len:]

	return
}

func withCORS(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		handler(w, r)
	}
}

func postCaptureHandler(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		slog.Error("Could not read request's body", "reason", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	capture, err := parseCapture(body)
	if err != nil {
		slog.Error("Could not parse the received capture", "reason", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	go processCapture(capture)

	w.WriteHeader(http.StatusOK)
}

func runVersionTestsHandler(w http.ResponseWriter, r *http.Request) {
	version := r.PathValue("version")
	if !isVersionAvailable(version) {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	ts := time.Now()
	reqId := uuid.New().String()

	w.Write([]byte(reqId))

	go runRequestedVersionTests(reqId, version, ts)
}

func runRequestedVersionTests(reqId string, version string, timestamp time.Time) {
	insertRequestState(reqId, RequestState{
		Id:        reqId,
		Status:    RequestPending,
		Timestamp: timestamp.Unix(),
		Version:   version,
	})

	totalTests, failedTests, err := runAllTests(reqId, version)

	if err != nil {
		slog.Error("Running tests failed", "reqId", reqId, "l2l1Version", version, "reason", err)

		requestFail(reqId, &RequestFailure{
			Reason: err.Error(),
		})
	} else {
		requestSucceed(reqId, &RequestSuccess{
			TotalTests:  uint(totalTests),
			FailedTests: uint(failedTests),
		})
	}
}

func getRequestStateHandler(w http.ResponseWriter, r *http.Request) {
	requestId := r.PathValue("requestId")

	state, ok := getRequestState(requestId)
	if !ok {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.Header().Add("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(&state)

	if err != nil {
		slog.Error("Could not marshal request's state", "state", state, "reason", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func getFailedTestsHandler(w http.ResponseWriter, r *http.Request) {
	requestId := r.PathValue("requestId")

	fails, err := queryFailedRequestTests(requestId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		slog.Error("Failed to query failed tests", "reqId", requestId, "reason", err)
		return
	}

	w.Header().Add("Content-Type", "application/json")

	if err = json.NewEncoder(w).Encode(fails); err != nil {
		slog.Error("Could not to encode json", "reqId", requestId, "reason", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func queryFailedRequestTests(reqId string) (fails []TestCaseFailure, err error) {
	var rows *sql.Rows
	rows, err = db.Query(`select tf.test_number, tf.reason, tpf.packet_id, tpf.message
                                      from test_failures as tf left join test_packet_failures as tpf
                                      on tpf.failure_id = tf.id where tf.result_id in (select id from test_results where request_id = ?);`, reqId)
	if err != nil {
		err = fmt.Errorf("failed to query failed tests: %s", err)
		return
	}

	defer rows.Close()

	fails = make([]TestCaseFailure, 0, 17)

	for rows.Next() {
		var (
			testNumber uint32
			reason     string
			packetId   sql.Null[uint32]
			message    sql.Null[uint16]
		)

		if err = rows.Scan(&testNumber, &reason, &packetId, &message); err != nil {
			err = fmt.Errorf("row.Scan failed: %s", err)
			return
		}

		fail := TestCaseFailure{
			Reason:     reason,
			TestNumber: testNumber,
		}

		if packetId.Valid != message.Valid {
			err = fmt.Errorf("mismatched nullability of `packetId` vs `message`: %+v VS %+v", packetId, message)
			return
		}

		if packetId.Valid {
			fail.PacketFailure = &TestCasePacketFailure{
				PacketId: packetId.V,
				Message:  message.V,
			}
		}

		fails = append(fails, fail)
	}

	if err = rows.Err(); err != nil {
		err = fmt.Errorf("rows.Err() failed: %s", err)
	}

	return
}

func runServer(port int) {
	http.HandleFunc("POST /capture", withCORS(postCaptureHandler))
	http.HandleFunc("GET /run/{version}", withCORS(runVersionTestsHandler))
	http.HandleFunc("GET /results/{requestId}", withCORS(getRequestStateHandler))
	http.HandleFunc("GET /failed-tests/{requestId}", withCORS(getFailedTestsHandler))

	slog.Info("Initializing the server")

	var err error

	err = updateSpecRepo()
	if err != nil {
		log.Fatalf("Could not update the spec repo: %s", err)
	}

	slog.Info("Updated the spec repo")

	err = updateGeneratorRepo()
	if err != nil {
		log.Fatalf("Could not update the generator repo: %s", err)
	}

	slog.Info("Updated the generator repo")

	// need this primarly for testing, maybe should pick a better id?
	insertRequestState("partial", RequestState{
		Id:        "partial",
		Status:    RequestSucceeded,
		Timestamp: 0,
		Version:   "5G21A_FB2010_061",
		Success:   &RequestSuccess{
			TotalTests:  10,
			FailedTests: 5,
		},
		static: true,
	})

	// background jobs
	go reloadGlueCodeOnChangesJob()
	go flushRequestStatesJob()

	addr := fmt.Sprintf(":%d", port)

	var workDir string
	workDir, err = os.Getwd()
	if err != nil {
		log.Fatalf("Could not get the working directory: %s", err)
	}

	fs := http.FileServer(http.Dir(path.Join(workDir, "ui")))
	http.Handle("/ui/", http.StripPrefix("/ui/", fs))

	slog.Info("Starting the server", "address", addr)

	if err = http.ListenAndServe(addr, nil); err != nil {
		log.Fatalf("Could not start the HTTP server: %s", err)
	}
}

func processCapture(capture Capture) {
	pcap, err := parsePcap(capture.body)
	if err != nil {
		slog.Info("Could not parse the capture file", "l2l1Version", capture.l2l1Version, "reason", err)
		return
	}

	slog.Info("Successfully parsed the capture file", "l2l1Version", capture.l2l1Version)

	err = generateTestTemplate(capture.l2l1Version, &pcap)
	if err != nil {
		slog.Error("Could not generate the SCT", "l2l1Version", capture.l2l1Version, "reason", err)
	}
}

const glueFileName = "./glue/glue.js"

var glueCode atomic.Value

func reloadGlueCodeOnChangesJob() {
	lastModified, _ := reloadGlueCodeIfNeeded(time.UnixMicro(0))

	for range time.Tick(5 * time.Second) {
		modTime, err := reloadGlueCodeIfNeeded(lastModified)

		if err != nil {
			slog.Error("Could not update glue code", "reason", err)
		} else if modTime != lastModified {
			slog.Info("Updated glue code", "timestamp", modTime.Format(time.DateTime))
		}

		lastModified = modTime
	}
}

func reloadGlueCodeIfNeeded(lastModified time.Time) (time.Time, error) {
	var (
		code    []byte
		modTime time.Time
	)

	stat, err := os.Stat(glueFileName)
	if err != nil {
		return lastModified, err
	}

	modTime = stat.ModTime()
	if lastModified.Compare(modTime) != -1 {
		return lastModified, err
	}

	lastModified = modTime

	code, err = os.ReadFile(glueFileName)
	if err != nil {
		return lastModified, err
	}

	glueCode.Store(string(code))

	return modTime, nil
}

func flushRequestStatesJob() {
	b := strings.Builder{}

	for range time.Tick(1 * time.Hour) {
		flushRequestStates(&b)
		b.Reset()
	}
}

func flushRequestStates(sqlBuilder *strings.Builder) {
	requestStatesMu.Lock()
	for id, state := range requestStates {
		if state.Status == RequestPending {
			continue
		}

		if state.Status == RequestFailed {
			serializeFailedRequest(sqlBuilder, &state)
		}

		if !state.static {
			delete(requestStates, id)
		}
	}
	requestStatesMu.Unlock()

	var (
		vQ  string
		q   string
		err error
	)

	if sqlBuilder.Len() == 0 {
		goto end
	}

	vQ = sqlBuilder.String()
	vQ = vQ[:len(vQ)-1]

	q = fmt.Sprintf("insert into request_failures(id, timestamp, reason, version) values %s", vQ)

	_, err = db.Exec(q)
	if err != nil {
		slog.Error("Could not run query against the DB", "query", q, "reason", err)
	}

end:
	slog.Info("Flushed request states to the database")
}

func serializeFailedRequest(b *strings.Builder, state *RequestState) {
	b.WriteRune('(')

	b.WriteRune('\'')
	b.WriteString(state.Id)
	b.WriteRune('\'')
	b.WriteRune(',')
	b.WriteString(strconv.Itoa(int(state.Timestamp)))
	b.WriteRune(',')
	b.WriteRune('\'')
	b.WriteString(state.Failure.Reason)
	b.WriteRune('\'')
	b.WriteRune(',')
	b.WriteRune('\'')
	b.WriteString(state.Version)
	b.WriteRune('\'')

	b.WriteRune(')')
	b.WriteRune(',')
}

type TestCasePacketFailure struct {
	PacketId uint32 `json:"packetId"`
	Message  uint16 `json:"message"`
}

type TestCaseFailure struct {
	Reason        string                 `json:"reason"`
	TestNumber    uint32                 `json:"testNumber"`
	PacketFailure *TestCasePacketFailure `json:"packetFailure,omitempty"`
}

type RequestFailure struct {
	Reason string `json:"reason"`
}

type RequestSuccess struct {
	TotalTests  uint `json:"totalTests"`
	FailedTests uint `json:"failedTests"`
}

type RequestState struct {
	Id        string          `json:"id"`
	Status    RequestStatus   `json:"status"`
	Timestamp int64           `json:"timestamp"`
	Version   string          `json:"version"`
	Failure   *RequestFailure `json:"failure,omitempty"`
	Success   *RequestSuccess `json:"success,omitempty"`
	static    bool
}

type RequestStatus uint8

const (
	RequestFailed    RequestStatus = 0
	RequestSucceeded RequestStatus = 1
	RequestPending   RequestStatus = 2
)

func (s RequestStatus) String() string {
	return [...]string{"failed", "succeeded", "pending"}[s]
}

func (s RequestStatus) MarshalJSON() ([]byte, error) {
	ss := s.String()
	res := make([]byte, len(ss)+2)

	res[0] = '"'
	copy(res[1:], ss)
	res[len(ss)+1] = '"'

	return res, nil
}

var (
	requestStates   = map[string]RequestState{}
	requestStatesMu sync.Mutex
)

func getRequestState(id string) (RequestState, bool) {
	requestStatesMu.Lock()
	state, ok := requestStates[id]
	requestStatesMu.Unlock()
	return state, ok
}

func insertRequestState(id string, state RequestState) {
	requestStatesMu.Lock()
	requestStates[id] = state
	requestStatesMu.Unlock()
}

func requestSucceed(id string, success *RequestSuccess) {
	requestStatesMu.Lock()
	defer requestStatesMu.Unlock()

	req, ok := requestStates[id]
	if !ok {
		slog.Error("Could not settle request: no such request", "id", id)
		return
	}

	if req.Status != RequestPending {
		slog.Error("Could not settle request: expected request to have `pending` status", "status", req.Status)
		return
	}

	req.Status = RequestSucceeded
	req.Success = success
	// NOTE: have to do this, since we are getting the request by value, not by a pointer, which is impossible
	requestStates[id] = req
}

func requestFail(id string, failure *RequestFailure) {
	requestStatesMu.Lock()
	defer requestStatesMu.Unlock()

	req, ok := requestStates[id]
	if !ok {
		slog.Error("Could not settle request: no such request", "id", id)
		return
	}

	if req.Status != RequestPending {
		slog.Error("Could not settle request: expected request to have `pending` status", "status", req.Status)
		return
	}

	req.Status = RequestFailed
	req.Failure = failure
	// NOTE: have to do this, since we are getting the request by value, not by a pointer, which is impossible
	requestStates[id] = req
}
