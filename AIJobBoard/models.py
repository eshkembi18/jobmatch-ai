# models.py
from datetime import datetime
from db import db

class Company(db.Model):
    __tablename__ = "companies"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
    jobs = db.relationship("Job", backref="company", lazy=True)

class Job(db.Model):
    __tablename__ = "jobs"
    id          = db.Column(db.Integer, primary_key=True)
    title       = db.Column(db.String(256), nullable=False)
    description = db.Column(db.Text)
    location    = db.Column(db.String(120))               # used by UI
    skills      = db.Column(db.String(512))               # comma-separated
    salary      = db.Column(db.String(64))
    posted_at   = db.Column(db.DateTime, default=datetime.utcnow)
    company_id  = db.Column(db.Integer, db.ForeignKey("companies.id"), nullable=False)

    # helpers for JSON
    def skills_list(self):
        if not self.skills: return []
        return [s.strip() for s in self.skills.split(",") if s.strip()]

class User(db.Model):
    __tablename__ = "users"
    id       = db.Column(db.Integer, primary_key=True)
    email    = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created  = db.Column(db.DateTime, default=datetime.utcnow)
