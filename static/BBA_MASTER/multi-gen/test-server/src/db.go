package main

import (
	"database/sql"
	"context"
	"os"
	"fmt"
)

var db *sql.DB

const dbFilename = "./multi.db"

func init() {
	runQuery := func(q string) {
		_, err := db.Exec(q)
		if err != nil {
			os.Remove(dbFilename)
			panic(err)
		}
	}

	runQueryTx := func(tx *sql.Tx, q string, args ...any) {
		_, err := tx.Exec(q, args...)
		if err != nil {
			os.Remove(dbFilename)
			panic(err)
		}
	}
	_ = runQueryTx

	connStr := fmt.Sprintf("file:%s?cache=shared", dbFilename)

	var err error
	db, err = sql.Open("sqlite3", connStr)
	if err != nil {
		panic(err)
	}

	runQuery(`create table if not exists test_templates (
                      id integer not null primary key,
                      version text not null,
                      template text not null,
                      capture blob not null
                  );`)

	runQuery(`create table if not exists test_results (
                      id integer not null primary key,
                      request_id text not null,
                      template_id integer not null,
                      total_tests integer not null,
                      foreign key(template_id) references test_templates(id)
                  );`)

	runQuery(`create table if not exists test_failures (
                      id integer not null primary key,
                      test_number integer not null,
                      result_id integer,
                      reason text not null,
                      foreign key(result_id) references test_results(id)
                  );`)

	runQuery(`create table if not exists test_packet_failures (
                      id integer not null primary key,
                      packet_id integer not null,
                      message integer not null,
                      failure_id integer not null,
                      foreign key(failure_id) references test_failures(id)
                  );`)

	runQuery(`create table if not exists request_failures (
                      id text not null primary key,
                      timestamp integer not null,
                      reason text not null,
                      version text not null
                  );`)

	rows, err := db.Query("select request_id from test_results where request_id='partial'")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	if !rows.Next() {
		tx, err := db.BeginTx(context.Background(), nil)
		if err != nil {
			panic(err)
		}

		runQueryTx(tx, `insert into test_templates(version, template, capture)
                  values ('5G21A_FB2010_061', 'const messages = [];', cast('' as BLOB));`)

		res, err := tx.Exec(`insert into test_results(request_id, template_id, total_tests)
                values ('partial', last_insert_rowid(), 10)`)
		if err != nil {
			panic(err)
		}

		var testId int64
		testId, err = res.LastInsertId()
		if err != nil {
			panic(err)
		}

		rows, err = tx.Query(`insert into test_failures(result_id, test_number, reason)
                  values (?, 1, 'idk'),
                         (?, 2, 'idk 1'),
                         (?, 3, 'idk 2'),
                         (?, 4, 'idk 3'),
                         (?, 5, 'idk 4') returning id;`, testId, testId, testId, testId, testId)
		if err != nil {
			panic(err)
		}
		defer rows.Close()

		failIds := [5]int64{}

		for i := 0; rows.Next(); i++ {
			if err = rows.Scan(&failIds[i]); err != nil {
				panic(err)
			}
		}

		if err = rows.Err(); err != nil {
			panic(err)
		}

		runQueryTx(tx, `insert into test_packet_failures(failure_id, packet_id, message)
                                values (?, 0, 1),
                                       (?, 1, 2),
                                       (?, 2, 3),
                                       (?, 3, 4),
                                       (?, 4, 5)`, failIds[0], failIds[1], failIds[2], failIds[3], failIds[4])

		if err = tx.Commit(); err != nil {
			panic(err)
		}
	}

	if err = rows.Err(); err != nil {
		panic(err)
	}
}
