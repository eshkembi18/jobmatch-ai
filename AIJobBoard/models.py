# models.py
from datetime import datetime
from db import db

class Company(db.Model):
    __tablename__ = 'companies'
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(128), nullable=False, unique=True)
    website     = db.Column(db.String(256))
    description = db.Column(db.Text)
    jobs        = db.relationship('Job', backref='company', lazy=True)

class Job(db.Model):
    __tablename__ = 'jobs'
    id          = db.Column(db.Integer, primary_key=True)
    title       = db.Column(db.String(256), nullable=False)
    description = db.Column(db.Text)
    location    = db.Column(db.String(128))
    posted_at   = db.Column(db.DateTime, default=datetime.utcnow)
    company_id  = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)

class User(db.Model):
    __tablename__ = 'users'
    id            = db.Column(db.Integer, primary_key=True)
    email         = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    joined_at     = db.Column(db.DateTime, default=datetime.utcnow)
