#!/usr/bin/env python3
"""
재난의학 서바이벌 — 교육생 데이터 관리 백엔드
FastAPI + SQLite
"""
import sqlite3
import json
import hashlib
import os
from datetime import datetime, timedelta
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel

DB_PATH = os.path.join(os.path.dirname(__file__), "students.db")

def get_db():
    db = sqlite3.connect(DB_PATH, check_same_thread=False)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA journal_mode=WAL")
    db.execute("PRAGMA foreign_keys=ON")
    return db

def init_db(db):
    db.executescript("""
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
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        details TEXT,
        FOREIGN KEY (session_id) REFERENCES sessions(session_id)
    );
    
    CREATE TABLE IF NOT EXISTS question_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        mode TEXT NOT NULL,
        question_id TEXT NOT NULL,
        selected_answer TEXT,
        is_correct BOOLEAN,
        time_taken_sec INTEGER DEFAULT 0,
        answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (session_id) REFERENCES sessions(session_id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_sessions_nickname ON sessions(nickname);
    CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions(started_at);
    CREATE INDEX IF NOT EXISTS idx_mode_results_session ON mode_results(session_id);
    CREATE INDEX IF NOT EXISTS idx_mode_results_mode ON mode_results(mode);
    CREATE INDEX IF NOT EXISTS idx_question_responses_session ON question_responses(session_id);
    CREATE INDEX IF NOT EXISTS idx_question_responses_question ON question_responses(question_id);
    """)
    db.commit()

db = get_db()
init_db(db)

# --- Admin password (simple hash-based) ---
ADMIN_PASSWORD = os.environ.get("ADMIN_PASS", "disaster2026!")
ADMIN_TOKEN_SECRET = os.environ.get("ADMIN_SECRET", "sch-disaster-med-admin-secret-key")

def make_admin_token():
    raw = f"{ADMIN_TOKEN_SECRET}:{datetime.utcnow().strftime('%Y-%m-%d')}"
    return hashlib.sha256(raw.encode()).hexdigest()[:32]

def verify_admin_token(token: str) -> bool:
    today = make_admin_token()
    yesterday_raw = f"{ADMIN_TOKEN_SECRET}:{(datetime.utcnow() - timedelta(days=1)).strftime('%Y-%m-%d')}"
    yesterday = hashlib.sha256(yesterday_raw.encode()).hexdigest()[:32]
    return token in (today, yesterday)

@asynccontextmanager
async def lifespan(app):
    yield
    db.close()

app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# ==========================================
# STUDENT DATA COLLECTION APIs
# ==========================================

class SessionStart(BaseModel):
    nickname: str
    device_info: Optional[str] = None

class ModeResult(BaseModel):
    session_id: str
    mode: str
    score: int = 0
    total_questions: int = 0
    correct_answers: int = 0
    time_spent_sec: int = 0
    details: Optional[str] = None

class QuestionResponse(BaseModel):
    session_id: str
    mode: str
    question_id: str
    selected_answer: str
    is_correct: bool
    time_taken_sec: int = 0

class SessionEnd(BaseModel):
    session_id: str
    total_score: int = 0
    max_level: int = 1
    max_streak: int = 0
    modes_completed: list = []

@app.post("/api/session/start")
def start_session(data: SessionStart, request: Request):
    visitor_id = request.headers.get("X-Visitor-Id", "unknown")
    ip_raw = request.headers.get("X-Forwarded-For", request.client.host if request.client else "unknown")
    ip_hash = hashlib.md5(ip_raw.encode()).hexdigest()[:12]
    session_id = f"S-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{hashlib.md5(f'{data.nickname}{visitor_id}{datetime.utcnow().isoformat()}'.encode()).hexdigest()[:8]}"
    
    db.execute(
        "INSERT INTO sessions (session_id, nickname, visitor_id, device_info, ip_hash) VALUES (?, ?, ?, ?, ?)",
        [session_id, data.nickname, visitor_id, data.device_info, ip_hash]
    )
    db.commit()
    return {"session_id": session_id, "status": "started"}

@app.post("/api/session/end")
def end_session(data: SessionEnd):
    db.execute(
        "UPDATE sessions SET ended_at=CURRENT_TIMESTAMP, total_score=?, max_level=?, max_streak=?, modes_completed=? WHERE session_id=?",
        [data.total_score, data.max_level, data.max_streak, json.dumps(data.modes_completed), data.session_id]
    )
    db.commit()
    return {"status": "ended"}

@app.post("/api/mode/result")
def save_mode_result(data: ModeResult):
    db.execute(
        "INSERT INTO mode_results (session_id, mode, score, total_questions, correct_answers, time_spent_sec, details) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [data.session_id, data.mode, data.score, data.total_questions, data.correct_answers, data.time_spent_sec, data.details]
    )
    db.commit()
    return {"status": "saved"}

@app.post("/api/question/response")
def save_question_response(data: QuestionResponse):
    db.execute(
        "INSERT INTO question_responses (session_id, mode, question_id, selected_answer, is_correct, time_taken_sec) VALUES (?, ?, ?, ?, ?, ?)",
        [data.session_id, data.mode, data.question_id, data.selected_answer, data.is_correct, data.time_taken_sec]
    )
    db.commit()
    return {"status": "saved"}

# ==========================================
# ADMIN APIs
# ==========================================

class AdminLogin(BaseModel):
    password: str

@app.post("/api/admin/login")
def admin_login(data: AdminLogin):
    if data.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="비밀번호가 틀렸습니다")
    token = make_admin_token()
    return {"token": token, "status": "authenticated"}

def require_admin(request: Request):
    auth = request.headers.get("Authorization", "")
    token = auth.replace("Bearer ", "")
    if not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="관리자 인증이 필요합니다")

@app.get("/api/admin/dashboard")
def admin_dashboard(request: Request):
    require_admin(request)
    
    # Total stats
    total_sessions = db.execute("SELECT COUNT(*) as cnt FROM sessions").fetchone()["cnt"]
    total_completed = db.execute("SELECT COUNT(*) as cnt FROM sessions WHERE ended_at IS NOT NULL").fetchone()["cnt"]
    avg_score = db.execute("SELECT COALESCE(AVG(total_score), 0) as avg FROM sessions WHERE ended_at IS NOT NULL").fetchone()["avg"]
    
    # Today's stats
    today = datetime.utcnow().strftime('%Y-%m-%d')
    today_sessions = db.execute("SELECT COUNT(*) as cnt FROM sessions WHERE DATE(started_at)=?", [today]).fetchone()["cnt"]
    
    # Mode performance
    mode_stats = db.execute("""
        SELECT mode, 
               COUNT(*) as attempts,
               AVG(score) as avg_score,
               AVG(CASE WHEN total_questions > 0 THEN CAST(correct_answers AS FLOAT)/total_questions*100 ELSE 0 END) as avg_accuracy,
               AVG(time_spent_sec) as avg_time
        FROM mode_results 
        GROUP BY mode
        ORDER BY mode
    """).fetchall()
    
    # Question difficulty (most missed questions)
    hard_questions = db.execute("""
        SELECT question_id, mode,
               COUNT(*) as total_attempts,
               SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_count,
               CAST(SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) * 100 as accuracy
        FROM question_responses
        GROUP BY question_id, mode
        HAVING total_attempts >= 3
        ORDER BY accuracy ASC
        LIMIT 20
    """).fetchall()
    
    # Recent sessions
    recent = db.execute("""
        SELECT session_id, nickname, started_at, ended_at, total_score, max_level, max_streak, modes_completed, device_info
        FROM sessions
        ORDER BY started_at DESC
        LIMIT 50
    """).fetchall()
    
    # Daily trend (last 30 days)
    daily_trend = db.execute("""
        SELECT DATE(started_at) as date, 
               COUNT(*) as sessions,
               AVG(total_score) as avg_score
        FROM sessions
        WHERE started_at >= DATE('now', '-30 days')
        GROUP BY DATE(started_at)
        ORDER BY date
    """).fetchall()
    
    return {
        "overview": {
            "total_sessions": total_sessions,
            "total_completed": total_completed,
            "avg_score": round(avg_score, 1),
            "today_sessions": today_sessions,
            "completion_rate": round(total_completed / total_sessions * 100, 1) if total_sessions > 0 else 0
        },
        "mode_stats": [dict(r) for r in mode_stats],
        "hard_questions": [dict(r) for r in hard_questions],
        "recent_sessions": [dict(r) for r in recent],
        "daily_trend": [dict(r) for r in daily_trend]
    }

@app.get("/api/admin/sessions")
def admin_sessions(request: Request, page: int = 1, per_page: int = 50, search: str = ""):
    require_admin(request)
    offset = (page - 1) * per_page
    
    if search:
        total = db.execute("SELECT COUNT(*) as cnt FROM sessions WHERE nickname LIKE ?", [f"%{search}%"]).fetchone()["cnt"]
        rows = db.execute("""
            SELECT * FROM sessions WHERE nickname LIKE ? ORDER BY started_at DESC LIMIT ? OFFSET ?
        """, [f"%{search}%", per_page, offset]).fetchall()
    else:
        total = db.execute("SELECT COUNT(*) as cnt FROM sessions").fetchone()["cnt"]
        rows = db.execute("SELECT * FROM sessions ORDER BY started_at DESC LIMIT ? OFFSET ?", [per_page, offset]).fetchall()
    
    return {"total": total, "page": page, "per_page": per_page, "sessions": [dict(r) for r in rows]}

@app.get("/api/admin/session/{session_id}")
def admin_session_detail(session_id: str, request: Request):
    require_admin(request)
    
    session = db.execute("SELECT * FROM sessions WHERE session_id=?", [session_id]).fetchone()
    if not session:
        raise HTTPException(status_code=404, detail="세션을 찾을 수 없습니다")
    
    modes = db.execute("SELECT * FROM mode_results WHERE session_id=? ORDER BY completed_at", [session_id]).fetchall()
    responses = db.execute("SELECT * FROM question_responses WHERE session_id=? ORDER BY answered_at", [session_id]).fetchall()
    
    return {
        "session": dict(session),
        "mode_results": [dict(r) for r in modes],
        "question_responses": [dict(r) for r in responses]
    }

@app.get("/api/admin/analytics/questions")
def admin_question_analytics(request: Request, mode: str = ""):
    require_admin(request)
    
    if mode:
        rows = db.execute("""
            SELECT question_id, mode,
                   COUNT(*) as total_attempts,
                   SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_count,
                   CAST(SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) * 100 as accuracy,
                   AVG(time_taken_sec) as avg_time
            FROM question_responses
            WHERE mode=?
            GROUP BY question_id
            ORDER BY accuracy ASC
        """, [mode]).fetchall()
    else:
        rows = db.execute("""
            SELECT question_id, mode,
                   COUNT(*) as total_attempts,
                   SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_count,
                   CAST(SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) * 100 as accuracy,
                   AVG(time_taken_sec) as avg_time
            FROM question_responses
            GROUP BY question_id, mode
            ORDER BY accuracy ASC
        """).fetchall()
    
    return {"questions": [dict(r) for r in rows]}

@app.get("/api/admin/export/csv")
def admin_export_csv(request: Request):
    require_admin(request)
    
    rows = db.execute("""
        SELECT s.session_id, s.nickname, s.started_at, s.ended_at, 
               s.total_score, s.max_level, s.max_streak, s.modes_completed,
               s.device_info, s.ip_hash
        FROM sessions s
        ORDER BY s.started_at DESC
    """).fetchall()
    
    csv_lines = ["session_id,nickname,started_at,ended_at,total_score,max_level,max_streak,modes_completed,device_info"]
    for r in rows:
        d = dict(r)
        csv_lines.append(f"{d['session_id']},{d['nickname']},{d['started_at']},{d['ended_at'] or ''},{d['total_score']},{d['max_level']},{d['max_streak']},{d['modes_completed']},{d['device_info'] or ''}")
    
    csv_content = "\n".join(csv_lines)
    return Response(content=csv_content, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=students_export.csv"})

@app.delete("/api/admin/sessions/clear")
def admin_clear_data(request: Request):
    require_admin(request)
    db.execute("DELETE FROM question_responses")
    db.execute("DELETE FROM mode_results")
    db.execute("DELETE FROM sessions")
    db.commit()
    return {"status": "cleared", "message": "모든 교육생 데이터가 삭제되었습니다"}

# ==========================================
# ADMIN DASHBOARD HTML (served at /admin)
# ==========================================

@app.get("/admin", response_class=HTMLResponse)
@app.get("/admin/", response_class=HTMLResponse)
def admin_page():
    return open(os.path.join(os.path.dirname(__file__), "admin.html"), encoding="utf-8").read()

# Health check
@app.get("/api/health")
def health():
    return {"status": "ok", "time": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
