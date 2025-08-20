# routes.py
import os
import re
from datetime import datetime

from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from sqlalchemy import and_, or_

from db import db
from models import Job, Company

api = Blueprint("api", __name__, url_prefix="/api")


# ---------- Health ----------
@api.route("/health", methods=["GET"])
def health():
    return jsonify({"ok": True})


# ---------- Jobs (smart search with q + loc) ----------
@api.route("/jobs", methods=["GET"])
def get_jobs():
    """
    Returns jobs. Supports:
      - q: general query (split into words; AND across words; OR across columns)
      - loc: location-specific words (matched mainly against Job.location)
    Uses LEFT OUTER JOIN to include jobs even if company rel is missing.
    """
    q_raw   = (request.args.get("q")   or "").strip()
    loc_raw = (request.args.get("loc") or "").strip()

    query = Job.query

    # Outer-join company if the relationship exists
    has_company_rel = False
    try:
        query = query.outerjoin(Company)  # won't drop jobs without a company
        has_company_rel = True
    except Exception:
        pass

    # Tokenize helpers
    def tokens(s: str):
        return [t for t in re.split(r"\s+", s.lower()) if t]

    q_tokens   = tokens(q_raw)
    loc_tokens = tokens(loc_raw)

    # Tiny variant generator to make matching forgiving
    def variants(t: str):
        v = {t}
        if t.endswith("ing"):  v.add(t[:-3])
        if t.endswith("es"):   v.add(t[:-2])
        if t.endswith("s"):    v.add(t[:-1])
        if t.endswith("ship"): v.add(t[:-4])
        if len(t) >= 6:        v.add(t[:6])  # loose prefix
        return v

    # Columns to search
    cols_general = [getattr(Job, "title", None),
                    getattr(Job, "description", None),
                    getattr(Job, "location", None)]
    if has_company_rel and hasattr(Company, "name"):
        cols_general.append(Company.name)
    cols_general = [c for c in cols_general if c is not None]

    cols_loc = [getattr(Job, "location", None)]
    cols_loc = [c for c in cols_loc if c is not None]

    clauses = []

    # For each general token, OR across columns; AND across tokens overall
    for t in q_tokens:
        ors = [col.ilike(f"%{v}%") for v in variants(t) for col in cols_general]
        if ors:
            clauses.append(or_(*ors))

    # Location-focused tokens (AND across each token)
    for t in loc_tokens:
        ors = [col.ilike(f"%{v}%") for v in variants(t) for col in cols_loc]
        if ors:
            clauses.append(or_(*ors))

    if clauses:
        query = query.filter(and_(*clauses))

    jobs = query.order_by(getattr(Job, "id")).limit(50).all()

    def ser(j):
        # company name whether you have a relationship or a plain field
        try:
            company_name = j.company.name if getattr(j, "company", None) else None
        except Exception:
            company_name = None

        return {
            "id": getattr(j, "id", None),
            "title": getattr(j, "title", "") or "",
            "company": company_name or getattr(j, "company_name", "") or "",
            "description": getattr(j, "description", "") or "",
            "location": getattr(j, "location", "") or "",
            "skills": (getattr(j, "skills", "") or "").split(",")
                      if getattr(j, "skills", None) else [],
            "salary": getattr(j, "salary", None),
            "posted_at": (getattr(j, "posted_at", None) or datetime.utcnow()).isoformat(),
        }

    return jsonify([ser(j) for j in jobs])


# ---------- Resume upload ----------
ALLOWED_EXTS = {".pdf", ".doc", ".docx", ".txt"}

@api.route("/upload-resume", methods=["POST"])
def upload_resume():
    """
    Receives multipart/form-data with field 'resume'.
    Saves to UPLOAD_FOLDER and returns a public URL.
    """
    if "resume" not in request.files:
        return jsonify({"error": "No file part named 'resume'"}), 400

    f = request.files["resume"]
    if not f or f.filename == "":
        return jsonify({"error": "No file selected"}), 400

    ext = os.path.splitext(f.filename)[1].lower()
    if ext not in ALLOWED_EXTS:
        return jsonify({"error": f"Unsupported file type {ext}"}), 400

    filename = secure_filename(f.filename)
    upload_dir = current_app.config.get(
        "UPLOAD_FOLDER", os.path.join(current_app.root_path, "uploads")
    )
    os.makedirs(upload_dir, exist_ok=True)
    f.save(os.path.join(upload_dir, filename))

    return jsonify({"message": "Uploaded", "filename": filename, "url": f"/uploads/{filename}"}), 200


# ---------- Dev seeding ----------
@api.route("/seed", methods=["GET", "POST"])
def seed():
    if Job.query.limit(1).first():
        return jsonify({"message": "Already seeded"}), 200

    # Create companies if model exists
    c1 = Company(name="AI Innovations") if hasattr(Company, "name") else None
    c2 = Company(name="StartupXYZ")     if hasattr(Company, "name") else None
    if c1: db.session.add(c1)
    if c2: db.session.add(c2)
    db.session.flush()

    def add_job(**kw):
        j = Job()
        for k, v in kw.items():
            if hasattr(Job, k):
                setattr(j, k, v)
        if hasattr(Job, "posted_at") and not getattr(j, "posted_at", None):
            j.posted_at = datetime.utcnow()
        db.session.add(j)

    add_job(
        title="Frontend Developer",
        description="Build responsive UI with HTML/CSS/JS.",
        location="Remote",
        skills="HTML,CSS,JavaScript",
        salary="$80K–$110K",
        company=c2 or None,
    )
    add_job(
        title="Data Scientist",
        description="Modeling, ML, and insights using Python/SQL.",
        location="San Francisco, CA",
        skills="Python,Machine Learning,SQL",
        salary="$120K–$160K",
        company=c1 or None,
    )
    add_job(
        title="Software Engineer (Intern)",
        description="Summer internship. Work on backend services.",
        location="Michigan, USA",
        skills="Python,Flask,SQL",
        salary="$25/hr",
        company=c2 or None,
    )

    db.session.commit()
    return jsonify({"message": "Seeded"}), 201
