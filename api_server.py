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
            WHERE mode=? OR mode LIKE ? || '\_%' ESCAPE '\\'
            GROUP BY question_id
            ORDER BY accuracy ASC
        """, [mode, mode]).fetchall()
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

# ==========================================
# RESEARCH / ACADEMIC ANALYSIS APIs
# ==========================================
import math
import statistics as _stats
from collections import defaultdict

# ------------------------------------------------------------------
# Pure-Python statistical helper functions
# (No numpy / scipy — only math and statistics stdlib)
# ------------------------------------------------------------------

def _safe_mean(lst):
    lst = [x for x in lst if x is not None]
    if not lst:
        return None
    return sum(lst) / len(lst)

def _safe_var(lst, ddof=1):
    """Sample variance (ddof=1) or population variance (ddof=0)."""
    lst = [x for x in lst if x is not None]
    n = len(lst)
    if n <= ddof:
        return None
    m = sum(lst) / n
    return sum((x - m) ** 2 for x in lst) / (n - ddof)

def _safe_std(lst, ddof=1):
    v = _safe_var(lst, ddof=ddof)
    if v is None or v < 0:
        return None
    return math.sqrt(v)

def _percentile(lst, p):
    """Return the p-th percentile (0-100) using linear interpolation."""
    lst = sorted(x for x in lst if x is not None)
    n = len(lst)
    if n == 0:
        return None
    if n == 1:
        return lst[0]
    rank = p / 100 * (n - 1)
    lo = int(rank)
    hi = lo + 1
    if hi >= n:
        return lst[-1]
    frac = rank - lo
    return lst[lo] + frac * (lst[hi] - lst[lo])

def _median(lst):
    return _percentile(lst, 50)

def _skewness(lst):
    """Adjusted Fisher-Pearson skewness (g1)."""
    lst = [x for x in lst if x is not None]
    n = len(lst)
    if n < 3:
        return None
    m = sum(lst) / n
    s = _safe_std(lst, ddof=1)
    if s is None or s == 0:
        return 0.0
    g1 = sum(((x - m) / s) ** 3 for x in lst) / n
    G1 = g1 * (n * (n - 1) ** 0.5) / (n - 2) if n > 2 else g1
    return round(G1, 6)

def _kurtosis(lst):
    """Excess kurtosis (Fisher definition, adjusted for sample bias)."""
    lst = [x for x in lst if x is not None]
    n = len(lst)
    if n < 4:
        return None
    m = sum(lst) / n
    s = _safe_std(lst, ddof=1)
    if s is None or s == 0:
        return 0.0
    g2 = sum(((x - m) / s) ** 4 for x in lst) / n - 3
    if (n - 2) * (n - 3) == 0:
        return g2
    G2 = ((n + 1) * g2 * n * (n - 1)) / ((n - 2) * (n - 3)) - (3 * (n - 1) ** 2) / ((n - 2) * (n - 3))
    return round(G2, 6)

def _t_critical_95(df):
    """Approximate two-tailed 95% t-critical value for given df."""
    if df <= 0:
        return 1.96
    table = {1:12.706,2:4.303,3:3.182,4:2.776,5:2.571,6:2.447,
             7:2.365,8:2.306,9:2.262,10:2.228,15:2.131,20:2.086,
             25:2.060,30:2.042,40:2.021,60:2.000,120:1.980}
    if df in table:
        return table[df]
    if df > 120:
        return 1.96
    keys = sorted(table.keys())
    for i in range(len(keys) - 1):
        d0, d1 = keys[i], keys[i+1]
        if d0 <= df <= d1:
            frac = (df - d0) / (d1 - d0)
            return table[d0] + frac * (table[d1] - table[d0])
    return 1.96

def _ci95_mean(lst):
    """95% CI for the mean using t-distribution."""
    lst = [x for x in lst if x is not None]
    n = len(lst)
    if n < 2:
        return (None, None)
    m = sum(lst) / n
    se = _safe_std(lst, ddof=1) / math.sqrt(n)
    t_crit = _t_critical_95(n - 1)
    return (round(m - t_crit * se, 6), round(m + t_crit * se, 6))

def _pearson_r(x_lst, y_lst):
    """Pearson correlation coefficient."""
    pairs = [(x, y) for x, y in zip(x_lst, y_lst) if x is not None and y is not None]
    if len(pairs) < 2:
        return None
    xs, ys = zip(*pairs)
    n = len(xs)
    mx = sum(xs) / n
    my = sum(ys) / n
    num = sum((xs[i] - mx) * (ys[i] - my) for i in range(n))
    denom = math.sqrt(sum((x - mx) ** 2 for x in xs) * sum((y - my) ** 2 for y in ys))
    if denom == 0:
        return None
    return round(num / denom, 6)

def _cohen_d(g1, g2):
    """Cohen's d for two independent samples."""
    g1 = [x for x in g1 if x is not None]
    g2 = [x for x in g2 if x is not None]
    n1, n2 = len(g1), len(g2)
    if n1 < 2 or n2 < 2:
        return None
    m1, m2 = sum(g1) / n1, sum(g2) / n2
    v1 = sum((x - m1) ** 2 for x in g1) / (n1 - 1)
    v2 = sum((x - m2) ** 2 for x in g2) / (n2 - 1)
    sp = math.sqrt(((n1 - 1) * v1 + (n2 - 1) * v2) / (n1 + n2 - 2))
    if sp == 0:
        return 0.0
    return round((m1 - m2) / sp, 6)

def _regularized_ibeta(x, a, b):
    """Regularized incomplete beta function I_x(a, b) via continued fraction (Lentz)."""
    if x <= 0:
        return 0.0
    if x >= 1:
        return 1.0
    if x > (a + 1) / (a + b + 2):
        return 1.0 - _regularized_ibeta(1.0 - x, b, a)
    lbeta = math.lgamma(a) + math.lgamma(b) - math.lgamma(a + b)
    front = math.exp(math.log(x) * a + math.log(1 - x) * b - lbeta) / a
    TINY = 1e-30
    f = TINY
    C = f
    D = 0.0
    for m_iter in range(200):
        for j in (0, 1):
            if m_iter == 0 and j == 0:
                num_cf = 1.0
            elif j == 0:
                num_cf = m_iter * (b - m_iter) * x / ((a + 2*m_iter - 1) * (a + 2*m_iter))
            else:
                num_cf = -(a + m_iter) * (a + b + m_iter) * x / ((a + 2*m_iter) * (a + 2*m_iter + 1))
            D = 1.0 + num_cf * D
            if abs(D) < TINY:
                D = TINY
            D = 1.0 / D
            C = 1.0 + num_cf / C
            if abs(C) < TINY:
                C = TINY
            delta = C * D
            f *= delta
            if abs(delta - 1.0) < 1e-10:
                break
    return front * f

def _t_pvalue_two_tailed(t, df):
    """Approximate two-tailed p-value from t-statistic."""
    if df <= 0:
        return 1.0
    t = abs(t)
    x = df / (df + t * t)
    p_one = _regularized_ibeta(x, df / 2, 0.5) / 2
    return min(1.0, max(0.0, p_one * 2))

def _welch_t_test(g1, g2):
    """Welch's independent-samples t-test. Returns (t, df, p)."""
    g1 = [x for x in g1 if x is not None]
    g2 = [x for x in g2 if x is not None]
    n1, n2 = len(g1), len(g2)
    if n1 < 2 or n2 < 2:
        return (None, None, None)
    m1, m2 = sum(g1) / n1, sum(g2) / n2
    v1 = sum((x - m1) ** 2 for x in g1) / (n1 - 1)
    v2 = sum((x - m2) ** 2 for x in g2) / (n2 - 1)
    se = math.sqrt(v1 / n1 + v2 / n2)
    if se == 0:
        return (0.0, n1 + n2 - 2, 1.0)
    t_stat = (m1 - m2) / se
    num_df = (v1 / n1 + v2 / n2) ** 2
    denom_df = (v1 / n1) ** 2 / (n1 - 1) + (v2 / n2) ** 2 / (n2 - 1)
    df = num_df / denom_df if denom_df != 0 else n1 + n2 - 2
    df = max(1, round(df))
    p = _t_pvalue_two_tailed(t_stat, df)
    return (round(t_stat, 6), round(df, 2), round(p, 6))

def _f_pvalue(F, df1, df2):
    """Approximate p-value for F distribution."""
    if F is None or F <= 0 or df1 <= 0 or df2 <= 0:
        return 1.0
    x = df2 / (df2 + df1 * F)
    return _regularized_ibeta(x, df2 / 2, df1 / 2)

def _cronbach_alpha(item_matrix):
    """Cronbach's alpha via variance formula: a=(k/(k-1))*(1-sum(si2)/st2)."""
    if not item_matrix or len(item_matrix) < 2:
        return None
    k = len(item_matrix[0])
    if k < 2:
        return None
    items_T = [[row[i] for row in item_matrix if i < len(row)] for i in range(k)]
    totals = [sum(row) for row in item_matrix]
    var_total = _safe_var(totals, ddof=1)
    if var_total is None or var_total == 0:
        return None
    sum_var_items = sum((_safe_var(col, ddof=1) or 0) for col in items_T)
    alpha = (k / (k - 1)) * (1 - sum_var_items / var_total)
    return round(max(-1.0, min(1.0, alpha)), 6)

def _split_half_reliability(item_matrix):
    """Odd-even split-half reliability (Spearman-Brown corrected)."""
    if not item_matrix or len(item_matrix) < 2:
        return None
    k = len(item_matrix[0])
    if k < 2:
        return None
    odd = [sum(row[i] for i in range(0, k, 2) if i < len(row)) for row in item_matrix]
    even = [sum(row[i] for i in range(1, k, 2) if i < len(row)) for row in item_matrix]
    r = _pearson_r(odd, even)
    if r is None:
        return None
    if r == 1.0:
        return 1.0
    return round(2 * r / (1 + r), 6)

def _descriptive_stats(lst, label=""):
    """Full descriptive stats dict for a numeric list."""
    lst = [x for x in lst if x is not None]
    n = len(lst)
    if n == 0:
        return {"label": label, "n": 0, "mean": None, "sd": None, "median": None,
                "min": None, "max": None, "skewness": None, "kurtosis": None,
                "ci95_lo": None, "ci95_hi": None,
                "q1": None, "q2": None, "q3": None, "iqr": None}
    m = sum(lst) / n
    sd = _safe_std(lst, ddof=1)
    ci_lo, ci_hi = _ci95_mean(lst)
    q1 = _percentile(lst, 25)
    q2 = _percentile(lst, 50)
    q3 = _percentile(lst, 75)
    return {
        "label": label,
        "n": n,
        "mean": round(m, 4),
        "sd": round(sd, 4) if sd is not None else None,
        "median": round(q2, 4) if q2 is not None else None,
        "min": round(min(lst), 4),
        "max": round(max(lst), 4),
        "skewness": _skewness(lst),
        "kurtosis": _kurtosis(lst),
        "ci95_lo": ci_lo,
        "ci95_hi": ci_hi,
        "q1": round(q1, 4) if q1 is not None else None,
        "q2": round(q2, 4) if q2 is not None else None,
        "q3": round(q3, 4) if q3 is not None else None,
        "iqr": round(q3 - q1, 4) if (q1 is not None and q3 is not None) else None,
    }

def _normality_check(lst):
    """Skewness/kurtosis-based normality check."""
    lst = [x for x in lst if x is not None]
    n = len(lst)
    if n < 3:
        return {"normal": None, "reason": "insufficient data"}
    sk = _skewness(lst)
    ku = _kurtosis(lst)
    se_sk = math.sqrt(6 * n * (n - 1) / ((n - 2) * (n + 1) * (n + 3))) if n > 2 else None
    se_ku = math.sqrt(24 * n * (n - 1) ** 2 / ((n - 3) * (n - 2) * (n + 3) * (n + 5))) if n > 3 else None
    z_sk = (sk / se_sk) if (se_sk and se_sk > 0 and sk is not None) else None
    z_ku = (ku / se_ku) if (se_ku and se_ku > 0 and ku is not None) else None
    normal = (abs(z_sk or 0) < 1.96) and (abs(z_ku or 0) < 1.96)
    return {
        "skewness": sk,
        "kurtosis": ku,
        "z_skewness": round(z_sk, 4) if z_sk is not None else None,
        "z_kurtosis": round(z_ku, 4) if z_ku is not None else None,
        "normal": normal,
        "reason": "skewness/kurtosis z-test (|z|<1.96)"
    }

def _histogram_bins(lst, n_bins=10):
    lst = sorted(x for x in lst if x is not None)
    if not lst:
        return []
    lo, hi = lst[0], lst[-1]
    if lo == hi:
        return [{"bin_lo": lo, "bin_hi": hi, "count": len(lst), "relative_freq": 1.0}]
    width = (hi - lo) / n_bins
    bins = []
    for i in range(n_bins):
        b_lo = lo + i * width
        b_hi = lo + (i + 1) * width
        if i == n_bins - 1:
            count = sum(1 for x in lst if b_lo <= x <= b_hi)
        else:
            count = sum(1 for x in lst if b_lo <= x < b_hi)
        bins.append({
            "bin_lo": round(b_lo, 4),
            "bin_hi": round(b_hi, 4),
            "count": count,
            "relative_freq": round(count / len(lst), 4)
        })
    return bins

def _one_way_anova(groups):
    """One-way ANOVA. groups: dict label->list. Returns F, dfs, p, eta2."""
    groups = {k: [x for x in v if x is not None] for k, v in groups.items()}
    groups = {k: v for k, v in groups.items() if len(v) >= 2}
    k = len(groups)
    if k < 2:
        return {"F": None, "df_between": None, "df_within": None, "p": None}
    all_vals = [x for v in groups.values() for x in v]
    N = len(all_vals)
    grand_mean = sum(all_vals) / N
    SS_b = sum(len(v) * (sum(v) / len(v) - grand_mean) ** 2 for v in groups.values())
    SS_w = sum(sum((x - sum(v) / len(v)) ** 2 for x in v) for v in groups.values())
    df_b = k - 1
    df_w = N - k
    if df_w <= 0 or SS_w == 0:
        return {"F": None, "df_between": df_b, "df_within": df_w, "p": None}
    MS_b = SS_b / df_b
    MS_w = SS_w / df_w
    F = MS_b / MS_w
    p = _f_pvalue(F, df_b, df_w)
    return {
        "F": round(F, 6),
        "df_between": df_b,
        "df_within": df_w,
        "MS_between": round(MS_b, 6),
        "MS_within": round(MS_w, 6),
        "p": round(p, 6),
        "eta_squared": round(SS_b / (SS_b + SS_w), 6)
    }


# ------------------------------------------------------------------
# Endpoint: comprehensive research / statistical analysis
# ------------------------------------------------------------------

@app.get("/api/admin/research/analysis")
def research_analysis(request: Request):
    require_admin(request)

    # Fetch raw data
    sessions_rows = db.execute(
        "SELECT * FROM sessions WHERE ended_at IS NOT NULL"
    ).fetchall()
    sessions = [dict(r) for r in sessions_rows]

    mode_rows = db.execute(
        "SELECT * FROM mode_results ORDER BY session_id, completed_at"
    ).fetchall()
    mode_results = [dict(r) for r in mode_rows]

    qr_rows = db.execute(
        "SELECT * FROM question_responses ORDER BY session_id, answered_at"
    ).fetchall()
    question_responses = [dict(r) for r in qr_rows]

    modes_set = sorted(set(r["mode"] for r in mode_results))

    scores_by_mode = defaultdict(list)
    accuracy_by_mode = defaultdict(list)
    time_by_mode = defaultdict(list)
    for r in mode_results:
        scores_by_mode[r["mode"]].append(r["score"])
        acc = (r["correct_answers"] / r["total_questions"] * 100
               if r["total_questions"] and r["total_questions"] > 0 else 0.0)
        accuracy_by_mode[r["mode"]].append(acc)
        time_by_mode[r["mode"]].append(r["time_spent_sec"])

    all_scores = [r["total_score"] for r in sessions if r["total_score"] is not None]

    # ==============================================================
    # 1. DESCRIPTIVE STATISTICS
    # ==============================================================
    desc_overall = _descriptive_stats(all_scores, label="overall")
    desc_by_mode = {m: _descriptive_stats(scores_by_mode[m], label=m) for m in modes_set}

    cohen_d_matrix = {}
    for i, m1 in enumerate(modes_set):
        for m2 in modes_set[i + 1:]:
            key = f"{m1}_vs_{m2}"
            d = _cohen_d(scores_by_mode[m1], scores_by_mode[m2])
            cohen_d_matrix[key] = {
                "d": d,
                "interpretation": (
                    "negligible" if d is None or abs(d) < 0.2
                    else "small" if abs(d) < 0.5
                    else "medium" if abs(d) < 0.8
                    else "large"
                )
            }

    descriptive_statistics = {
        "overall": desc_overall,
        "by_mode": desc_by_mode,
        "effect_sizes_cohen_d": cohen_d_matrix
    }

    # ==============================================================
    # 2. ITEM ANALYSIS
    # ==============================================================
    session_total_correct = defaultdict(int)
    for r in question_responses:
        session_total_correct[r["session_id"]] += (1 if r["is_correct"] else 0)

    qr_by_mode_qid = defaultdict(lambda: defaultdict(list))
    for r in question_responses:
        qr_by_mode_qid[r["mode"]][r["question_id"]].append({
            "is_correct": 1 if r["is_correct"] else 0,
            "session_id": r["session_id"],
            "time_taken_sec": r["time_taken_sec"]
        })

    item_analysis = {}
    for mode in modes_set:
        items_result = {}
        for qid, responses in qr_by_mode_qid[mode].items():
            n_total = len(responses)
            n_correct = sum(r["is_correct"] for r in responses)
            p_diff = n_correct / n_total if n_total > 0 else None

            sorted_r = sorted(responses, key=lambda r: session_total_correct[r["session_id"]])
            n_group = max(1, int(n_total * 0.27))
            bottom_grp = sorted_r[:n_group]
            top_grp = sorted_r[-n_group:]
            p_top = sum(r["is_correct"] for r in top_grp) / len(top_grp) if top_grp else None
            p_bot = sum(r["is_correct"] for r in bottom_grp) / len(bottom_grp) if bottom_grp else None
            D = round(p_top - p_bot, 4) if (p_top is not None and p_bot is not None) else None

            item_scores = [r["is_correct"] for r in responses]
            total_scores_list = [session_total_correct[r["session_id"]] for r in responses]
            rpb = _pearson_r(item_scores, total_scores_list)

            if D is None or rpb is None:
                flag = "Insufficient Data"
            elif D >= 0.30 and rpb >= 0.20:
                flag = "Good"
            elif D >= 0.20 or rpb >= 0.15:
                flag = "Revise"
            else:
                flag = "Poor"

            avg_time = _safe_mean([r["time_taken_sec"] for r in responses])
            items_result[qid] = {
                "n": n_total,
                "p_difficulty": round(p_diff, 4) if p_diff is not None else None,
                "p_top27": round(p_top, 4) if p_top is not None else None,
                "p_bot27": round(p_bot, 4) if p_bot is not None else None,
                "D_discrimination": D,
                "rpb_point_biserial": round(rpb, 4) if rpb is not None else None,
                "avg_time_sec": round(avg_time, 2) if avg_time is not None else None,
                "flag": flag
            }

        flags = [v["flag"] for v in items_result.values()]
        item_analysis[mode] = {
            "items": items_result,
            "summary": {
                "total_items": len(items_result),
                "good": flags.count("Good"),
                "revise": flags.count("Revise"),
                "poor": flags.count("Poor"),
                "insufficient": flags.count("Insufficient Data")
            }
        }

    # ==============================================================
    # 3. RELIABILITY ANALYSIS
    # ==============================================================
    reliability = {}
    for mode in modes_set:
        session_item_map = defaultdict(dict)
        for r in question_responses:
            if r["mode"] == mode:
                session_item_map[r["session_id"]][r["question_id"]] = 1 if r["is_correct"] else 0

        if not session_item_map:
            reliability[mode] = {"cronbach_alpha": None, "split_half_reliability": None, "sem": None}
            continue

        all_qids = sorted(set(qid for items in session_item_map.values() for qid in items))
        k_items = len(all_qids)
        if k_items < 2:
            reliability[mode] = {"cronbach_alpha": None, "split_half_reliability": None, "sem": None, "n_items": k_items}
            continue

        matrix = [[items.get(qid, 0) for qid in all_qids] for items in session_item_map.values()]
        alpha = _cronbach_alpha(matrix)
        split_h = _split_half_reliability(matrix)
        sd_scores = _safe_std(scores_by_mode[mode], ddof=1)
        sem = round(sd_scores * math.sqrt(1 - alpha), 4) if (alpha is not None and sd_scores is not None) else None

        alpha_interp = ("N/A" if alpha is None
                        else "Excellent" if alpha >= 0.90
                        else "Good" if alpha >= 0.80
                        else "Acceptable" if alpha >= 0.70
                        else "Questionable" if alpha >= 0.60
                        else "Poor")

        reliability[mode] = {
            "n_respondents": len(matrix),
            "n_items": k_items,
            "cronbach_alpha": alpha,
            "alpha_interpretation": alpha_interp,
            "split_half_reliability": split_h,
            "sem": sem
        }

    # ==============================================================
    # 4. CORRELATION MATRIX
    # ==============================================================
    session_mode_score = defaultdict(dict)
    for r in mode_results:
        session_mode_score[r["session_id"]][r["mode"]] = r["score"]

    correlation_matrix = {}
    for m1 in modes_set:
        correlation_matrix[m1] = {}
        for m2 in modes_set:
            if m1 == m2:
                correlation_matrix[m1][m2] = 1.0
            else:
                pairs_s = [(session_mode_score[s].get(m1), session_mode_score[s].get(m2))
                           for s in session_mode_score
                           if m1 in session_mode_score[s] and m2 in session_mode_score[s]]
                if pairs_s:
                    x_l, y_l = zip(*pairs_s)
                    correlation_matrix[m1][m2] = _pearson_r(list(x_l), list(y_l))
                else:
                    correlation_matrix[m1][m2] = None

    tv_pairs = [(r["time_spent_sec"], r["correct_answers"] / r["total_questions"] * 100)
                for r in mode_results if r["total_questions"] and r["total_questions"] > 0]
    time_vs_accuracy_r = (_pearson_r([p[0] for p in tv_pairs], [p[1] for p in tv_pairs])
                          if tv_pairs else None)

    sess_level = {r["session_id"]: r["max_level"] for r in sessions}
    lv_pairs = [(sess_level.get(r["session_id"]), r["correct_answers"] / r["total_questions"] * 100)
                for r in mode_results
                if r["total_questions"] and r["total_questions"] > 0
                and sess_level.get(r["session_id"]) is not None]
    level_vs_accuracy_r = (_pearson_r([p[0] for p in lv_pairs], [p[1] for p in lv_pairs])
                           if lv_pairs else None)

    correlation_analysis = {
        "mode_score_correlation_matrix": correlation_matrix,
        "time_vs_accuracy_r": time_vs_accuracy_r,
        "level_vs_accuracy_r": level_vs_accuracy_r
    }

    # ==============================================================
    # 5. SCORE DISTRIBUTION ANALYSIS
    # ==============================================================
    score_distribution = {
        "overall_histogram": _histogram_bins(all_scores, n_bins=10),
        "by_mode_histogram": {m: _histogram_bins(scores_by_mode[m], n_bins=10) for m in modes_set},
        "normality_overall": _normality_check(all_scores),
        "normality_by_mode": {m: _normality_check(scores_by_mode[m]) for m in modes_set}
    }

    # ==============================================================
    # 6. LEARNING CURVE ANALYSIS
    # ==============================================================
    visitor_sessions = defaultdict(list)
    for s in sessions:
        key = s.get("visitor_id") or s.get("nickname") or s["session_id"]
        visitor_sessions[key].append(s)

    multi_visit = {k: sorted(v, key=lambda x: x["started_at"] or "")
                   for k, v in visitor_sessions.items() if len(v) >= 2}

    session_progressions = []
    improvement_rates = []
    for visitor, sess_list in multi_visit.items():
        scores_seq = [s["total_score"] for s in sess_list if s["total_score"] is not None]
        if len(scores_seq) >= 2:
            deltas = [scores_seq[i + 1] - scores_seq[i] for i in range(len(scores_seq) - 1)]
            avg_imp = sum(deltas) / len(deltas)
            improvement_rates.append(avg_imp)
            session_progressions.append({
                "visitor": visitor[:8] + "..." if len(visitor) > 8 else visitor,
                "n_sessions": len(scores_seq),
                "scores": scores_seq,
                "avg_improvement_per_session": round(avg_imp, 2)
            })

    learning_curve = {
        "n_multi_session_students": len(multi_visit),
        "average_improvement_per_session": round(_safe_mean(improvement_rates) or 0, 4),
        "progressions": session_progressions[:50]
    }

    # ==============================================================
    # 7. TIME ANALYSIS
    # ==============================================================
    time_analysis = {}
    for mode in modes_set:
        times = time_by_mode[mode]
        total_qs_list = [r["total_questions"] for r in mode_results
                         if r["mode"] == mode and r["total_questions"]]
        avg_q = _safe_mean(total_qs_list)
        avg_t = _safe_mean(times)
        avg_time_per_q = round((avg_t or 0) / avg_q, 2) if (avg_q and avg_q > 0) else None
        time_acc_r = _pearson_r(times, accuracy_by_mode[mode])
        time_analysis[mode] = {
            "n": len(times),
            "avg_time_sec": round(avg_t or 0, 2),
            "sd_time_sec": round(_safe_std(times, ddof=1) or 0, 2),
            "avg_time_per_question_sec": avg_time_per_q,
            "time_vs_accuracy_r": round(time_acc_r, 4) if time_acc_r is not None else None,
            "histogram": _histogram_bins(times, n_bins=10)
        }

    # ==============================================================
    # 8. COMPARATIVE ANALYSIS
    # ==============================================================
    pairwise_ttests = {}
    for i, m1 in enumerate(modes_set):
        for m2 in modes_set[i + 1:]:
            key = f"{m1}_vs_{m2}"
            t_stat, df_val, p_val = _welch_t_test(scores_by_mode[m1], scores_by_mode[m2])
            d_val = _cohen_d(scores_by_mode[m1], scores_by_mode[m2])
            pairwise_ttests[key] = {
                "t": t_stat, "df": df_val, "p": p_val,
                "cohen_d": d_val,
                "significant_p05": (p_val < 0.05) if p_val is not None else None,
                "significant_p01": (p_val < 0.01) if p_val is not None else None,
                "n1": len([x for x in scores_by_mode[m1] if x is not None]),
                "n2": len([x for x in scores_by_mode[m2] if x is not None]),
                "mean1": round(_safe_mean(scores_by_mode[m1]) or 0, 4),
                "mean2": round(_safe_mean(scores_by_mode[m2]) or 0, 4)
            }

    anova_result = _one_way_anova(dict(scores_by_mode))

    n_comp = len(pairwise_ttests)
    for v in pairwise_ttests.values():
        if v["p"] is not None and n_comp > 0:
            p_bonf = min(1.0, v["p"] * n_comp)
            v["p_bonferroni"] = round(p_bonf, 6)
            v["significant_bonferroni"] = p_bonf < 0.05
        else:
            v["p_bonferroni"] = None
            v["significant_bonferroni"] = None

    comparative_analysis = {
        "pairwise_t_tests": pairwise_ttests,
        "one_way_anova": anova_result
    }

    # ==============================================================
    # 9. PERFORMANCE CATEGORIES
    # ==============================================================
    def _categorize(score, max_score=100):
        if max_score == 0:
            return "Unknown"
        pct = score / max_score * 100
        if pct >= 90: return "Excellent"
        if pct >= 75: return "Good"
        if pct >= 60: return "Average"
        if pct >= 40: return "Below Average"
        return "Poor"

    max_by_mode = {}
    for r in mode_results:
        m = r["mode"]
        if m not in max_by_mode or r["score"] > max_by_mode[m]:
            max_by_mode[m] = r["score"]

    perf_categories = {}
    for mode in modes_set:
        max_s = max_by_mode.get(mode, 100) or 100
        cats = defaultdict(int)
        for s in scores_by_mode[mode]:
            cats[_categorize(s, max_s)] += 1
        total_m = sum(cats.values())
        perf_categories[mode] = {
            k: {"count": v, "pct": round(v / total_m * 100, 2) if total_m > 0 else 0}
            for k, v in cats.items()
        }

    all_max = max(all_scores) if all_scores else 100
    cats_overall = defaultdict(int)
    for s in all_scores:
        cats_overall[_categorize(s, all_max or 100)] += 1
    total_all = sum(cats_overall.values())
    perf_categories["overall"] = {
        k: {"count": v, "pct": round(v / total_all * 100, 2) if total_all > 0 else 0}
        for k, v in cats_overall.items()
    }

    # ==============================================================
    # 10. PAPER-READY SUMMARY TABLES
    # ==============================================================
    device_counts = defaultdict(int)
    for s in sessions:
        device_counts[s.get("device_info") or "unknown"] += 1

    hour_dist = defaultdict(int)
    for s in sessions:
        ts = s.get("started_at") or ""
        try:
            hour = int(ts[11:13]) if len(ts) >= 13 else -1
            if hour >= 0:
                hour_dist[hour] += 1
        except Exception:
            pass

    def _session_duration_min(s):
        try:
            a = s.get("started_at")
            b = s.get("ended_at")
            if a and b:
                return (datetime.fromisoformat(b) - datetime.fromisoformat(a)).total_seconds() / 60
        except Exception:
            pass
        return None

    table1_demographics = {
        "total_participants": len(sessions),
        "total_mode_completions": len(mode_results),
        "total_question_responses": len(question_responses),
        "device_distribution": dict(device_counts),
        "hour_of_day_distribution": {str(k): v for k, v in sorted(hour_dist.items())},
        "avg_session_duration_min": round(
            _safe_mean([_session_duration_min(s) for s in sessions]) or 0, 2
        )
    }

    table2_desc = []
    for mode in modes_set:
        d = dict(desc_by_mode[mode])
        d["mode"] = mode
        table2_desc.append(d)

    table3_items = []
    for mode in modes_set:
        items = item_analysis[mode]["items"]
        p_vals = [v["p_difficulty"] for v in items.values() if v["p_difficulty"] is not None]
        d_vals = [v["D_discrimination"] for v in items.values() if v["D_discrimination"] is not None]
        rpb_vals = [v["rpb_point_biserial"] for v in items.values() if v["rpb_point_biserial"] is not None]
        table3_items.append({
            "mode": mode,
            "n_items": len(items),
            "avg_difficulty_p": round(_safe_mean(p_vals) or 0, 4),
            "avg_discrimination_D": round(_safe_mean(d_vals) or 0, 4),
            "avg_rpb": round(_safe_mean(rpb_vals) or 0, 4),
            "good_items": item_analysis[mode]["summary"]["good"],
            "revise_items": item_analysis[mode]["summary"]["revise"],
            "poor_items": item_analysis[mode]["summary"]["poor"]
        })

    table4_reliability = [{"mode": mode, **reliability[mode]} for mode in modes_set]

    table5_corr = []
    for m1 in modes_set:
        row = {"mode": m1}
        for m2 in modes_set:
            row[m2] = correlation_matrix.get(m1, {}).get(m2)
        table5_corr.append(row)

    table6_comparative = []
    for key, v in pairwise_ttests.items():
        m1_name, _, m2_name = key.partition("_vs_")
        table6_comparative.append({"comparison": key, "mode1": m1_name, "mode2": m2_name, **v})
    table6_comparative.append({"comparison": "ANOVA", **anova_result})

    summary_tables = {
        "table1_demographics": table1_demographics,
        "table2_descriptive_statistics": table2_desc,
        "table3_item_analysis": table3_items,
        "table4_reliability": table4_reliability,
        "table5_correlation_matrix": table5_corr,
        "table6_comparative_statistics": table6_comparative
    }

    return {
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "n_sessions_analyzed": len(sessions),
        "n_mode_results": len(mode_results),
        "n_question_responses": len(question_responses),
        "modes": modes_set,
        "section1_descriptive_statistics": descriptive_statistics,
        "section2_item_analysis": item_analysis,
        "section3_reliability": reliability,
        "section4_correlation_analysis": correlation_analysis,
        "section5_score_distribution": score_distribution,
        "section6_learning_curve": learning_curve,
        "section7_time_analysis": time_analysis,
        "section8_comparative_analysis": comparative_analysis,
        "section9_performance_categories": perf_categories,
        "section10_summary_tables": summary_tables
    }


# ------------------------------------------------------------------
# Endpoint: raw data export (SPSS / R / Python compatible)
# ------------------------------------------------------------------

@app.get("/api/admin/research/export")
def research_export(request: Request):
    require_admin(request)

    sessions_rows = db.execute("SELECT * FROM sessions").fetchall()
    mode_rows = db.execute("SELECT * FROM mode_results").fetchall()
    qr_rows = db.execute("SELECT * FROM question_responses").fetchall()

    sessions_list = [dict(r) for r in sessions_rows]
    mode_list = [dict(r) for r in mode_rows]
    qr_list = [dict(r) for r in qr_rows]

    for r in mode_list:
        tq = r.get("total_questions") or 0
        ca = r.get("correct_answers") or 0
        r["accuracy_pct"] = round(ca / tq * 100, 4) if tq > 0 else None
        r["time_per_question_sec"] = round(r["time_spent_sec"] / tq, 4) if tq > 0 else None

    for r in qr_list:
        r["is_correct_int"] = 1 if r.get("is_correct") else 0

    return {
        "export_format": "JSON (SPSS/R/Python compatible)",
        "exported_at": datetime.utcnow().isoformat() + "Z",
        "schema": {
            "sessions": [
                "id", "session_id", "nickname", "visitor_id", "started_at",
                "ended_at", "total_score", "max_level", "max_streak",
                "modes_completed", "device_info", "ip_hash"
            ],
            "mode_results": [
                "id", "session_id", "mode", "score", "total_questions",
                "correct_answers", "time_spent_sec", "completed_at", "details",
                "accuracy_pct", "time_per_question_sec"
            ],
            "question_responses": [
                "id", "session_id", "mode", "question_id", "selected_answer",
                "is_correct", "is_correct_int", "time_taken_sec", "answered_at"
            ]
        },
        "data": {
            "sessions": sessions_list,
            "mode_results": mode_list,
            "question_responses": qr_list
        },
        "row_counts": {
            "sessions": len(sessions_list),
            "mode_results": len(mode_list),
            "question_responses": len(qr_list)
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
