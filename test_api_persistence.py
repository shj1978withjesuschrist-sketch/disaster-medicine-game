#!/usr/bin/env python3
"""Backend persistence tests for Cross-Border CBRNe Drill closeout.

Verifies:
- mode_results.details and question_responses.extras columns exist (post-migration).
- POST /api/question/response stores extras when provided.
- POST /api/mode/result stores details when provided.
- Backward-compatible migration leaves prior rows intact.
- /api/admin/mode/{mode}/details returns persisted payloads.
"""
import json
import os
import sqlite3
import sys
import tempfile
import unittest


class BackendPersistenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmpdir = tempfile.mkdtemp()
        cls.db_path = os.path.join(cls.tmpdir, "students.db")

        # Pre-create an old-shape DB to simulate a pre-migration deployment.
        old_db = sqlite3.connect(cls.db_path)
        old_db.executescript("""
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT UNIQUE NOT NULL,
            nickname TEXT NOT NULL,
            visitor_id TEXT,
            started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ended_at TIMESTAMP,
            total_score INTEGER DEFAULT 0,
            max_level INTEGER DEFAULT 1,
            max_streak INTEGER DEFAULT 0,
            modes_completed TEXT DEFAULT '[]',
            device_info TEXT,
            ip_hash TEXT
        );
        CREATE TABLE IF NOT EXISTS mode_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            mode TEXT NOT NULL,
            score INTEGER DEFAULT 0,
            total_questions INTEGER DEFAULT 0,
            correct_answers INTEGER DEFAULT 0,
            time_spent_sec INTEGER DEFAULT 0,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            -- intentionally no `details` column to exercise the migration
        );
        CREATE TABLE IF NOT EXISTS question_responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            mode TEXT NOT NULL,
            question_id TEXT NOT NULL,
            selected_answer TEXT,
            is_correct BOOLEAN,
            time_taken_sec INTEGER DEFAULT 0,
            answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            -- intentionally no `extras` column to exercise the migration
        );
        """)
        old_db.execute(
            "INSERT INTO sessions (session_id, nickname) VALUES ('S-LEGACY', 'pre-migration-user')"
        )
        old_db.commit()
        old_db.close()

        # Import api_server with DB_PATH overridden — this triggers the migration.
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        import importlib
        import api_server
        api_server.DB_PATH = cls.db_path
        api_server.db.close()
        api_server.db = api_server.get_db()
        api_server.init_db(api_server.db)
        cls.api_server = api_server

        from fastapi.testclient import TestClient
        cls.client = TestClient(api_server.app)

        login = cls.client.post("/api/admin/login", json={"password": api_server.ADMIN_PASSWORD})
        cls.admin_headers = {"Authorization": f"Bearer {login.json()['token']}"}

    def test_01_legacy_row_preserved(self):
        row = self.api_server.db.execute(
            "SELECT nickname FROM sessions WHERE session_id='S-LEGACY'"
        ).fetchone()
        self.assertIsNotNone(row, "pre-migration row was lost during migration")
        self.assertEqual(row["nickname"], "pre-migration-user")

    def test_02_migration_added_details_column(self):
        cols = {r[1] for r in self.api_server.db.execute("PRAGMA table_info(mode_results)").fetchall()}
        self.assertIn("details", cols, "mode_results.details column missing after migration")

    def test_03_migration_added_extras_column(self):
        cols = {r[1] for r in self.api_server.db.execute("PRAGMA table_info(question_responses)").fetchall()}
        self.assertIn("extras", cols, "question_responses.extras column missing after migration")

    def test_04_question_response_stores_extras(self):
        # start session
        s = self.client.post("/api/session/start", json={"nickname": "tester1"})
        sid = s.json()["session_id"]

        extras_payload = {
            "stepId": "triage",
            "stepIndex": 1,
            "construct": "triage",
            "phase": "field_triage",
            "role": "Field Triage Officer",
            "correctOptionId": "red_immediate",
            "selectedOptionId": "red_immediate",
            "selectedDisplayIndex": 2,
            "displayedOptionOrder": ["yellow", "green", "red_immediate", "black"],
            "responseTimeSec": 8,
            "timeTakenSec": 8,
            "modeName": "Cross-Border CBRNe Drill",
            "language": "ko",
            "version": "cross-border-cbrne-v1"
        }

        r = self.client.post("/api/question/response", json={
            "session_id": sid,
            "mode": "crossBorderCbrne",
            "question_id": "cbcb_triage",
            "selected_answer": "red_immediate",
            "is_correct": True,
            "time_taken_sec": 8,
            "extras": json.dumps(extras_payload)
        })
        self.assertEqual(r.status_code, 200)

        row = self.api_server.db.execute(
            "SELECT extras FROM question_responses WHERE session_id=? AND question_id=?",
            [sid, "cbcb_triage"]
        ).fetchone()
        self.assertIsNotNone(row)
        self.assertIsNotNone(row["extras"], "extras was dropped on insert")
        recovered = json.loads(row["extras"])
        for k in ["stepId", "construct", "phase", "role", "correctOptionId",
                  "selectedOptionId", "selectedDisplayIndex", "displayedOptionOrder",
                  "responseTimeSec", "timeTakenSec", "modeName", "language"]:
            self.assertIn(k, recovered, f"extras.{k} dropped")
        self.assertEqual(recovered["modeName"], "Cross-Border CBRNe Drill")

    def test_05_question_response_without_extras_still_works(self):
        s = self.client.post("/api/session/start", json={"nickname": "tester2"})
        sid = s.json()["session_id"]

        r = self.client.post("/api/question/response", json={
            "session_id": sid,
            "mode": "crossBorderCbrne",
            "question_id": "cbcb_briefing",
            "selected_answer": "ack",
            "is_correct": True,
            "time_taken_sec": 1
        })
        self.assertEqual(r.status_code, 200)
        row = self.api_server.db.execute(
            "SELECT extras FROM question_responses WHERE session_id=? AND question_id=?",
            [sid, "cbcb_briefing"]
        ).fetchone()
        self.assertIsNone(row["extras"])

    def test_06_mode_result_stores_details(self):
        s = self.client.post("/api/session/start", json={"nickname": "tester3"})
        sid = s.json()["session_id"]

        details_payload = {
            "mode": "crossBorderCbrne",
            "modeLabel": "Cross-Border CBRNe Drill",
            "language": "ko",
            "accuracyPct": 100,
            "targets": {
                "triageLatencySec": 90,
                "handoverLatencySec": 180,
                "preventableContaminatedTransport": 0,
                "degradedRecoverySec": 120
            },
            "structuredResults": [{"stepId": "triage", "correct": True}]
        }

        r = self.client.post("/api/mode/result", json={
            "session_id": sid,
            "mode": "crossBorderCbrne",
            "score": 600,
            "total_questions": 6,
            "correct_answers": 6,
            "time_spent_sec": 240,
            "details": json.dumps(details_payload)
        })
        self.assertEqual(r.status_code, 200)

        row = self.api_server.db.execute(
            "SELECT details FROM mode_results WHERE session_id=?", [sid]
        ).fetchone()
        self.assertIsNotNone(row)
        self.assertIsNotNone(row["details"], "details was dropped on insert")
        recovered = json.loads(row["details"])
        self.assertEqual(recovered["modeLabel"], "Cross-Border CBRNe Drill")
        self.assertEqual(recovered["language"], "ko")
        self.assertEqual(recovered["accuracyPct"], 100)
        self.assertIn("targets", recovered)

    def test_07_admin_mode_details_endpoint(self):
        r = self.client.get(
            "/api/admin/mode/crossBorderCbrne/details",
            headers=self.admin_headers
        )
        self.assertEqual(r.status_code, 200)
        body = r.json()
        self.assertEqual(body["mode"], "crossBorderCbrne")
        self.assertGreaterEqual(body["n_mode_results"], 1)
        self.assertGreaterEqual(body["n_question_responses"], 1)

        # Mode results should expose parsed details_json with the AAR keys.
        mr = body["mode_results"][0]
        self.assertIn("details_json", mr)
        self.assertEqual(mr["details_json"]["modeLabel"], "Cross-Border CBRNe Drill")

        # Question responses should expose parsed extras_json.
        qr = body["question_responses"][0]
        self.assertIn("extras_json", qr)
        self.assertEqual(qr["extras_json"]["modeName"], "Cross-Border CBRNe Drill")

    def test_08_admin_endpoint_requires_auth(self):
        r = self.client.get("/api/admin/mode/crossBorderCbrne/details")
        self.assertEqual(r.status_code, 401)

    def test_09_no_user_facing_iscram(self):
        # Verify the backend does not return any user-facing ISCRAM string.
        r = self.client.get(
            "/api/admin/mode/crossBorderCbrne/details",
            headers=self.admin_headers
        )
        self.assertNotIn("ISCRAM", r.text)


if __name__ == "__main__":
    unittest.main(verbosity=2)
