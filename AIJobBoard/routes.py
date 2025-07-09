# routes.py
from flask import Blueprint, request, jsonify
from db import db
from models import Job, Company

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.order_by(Job.posted_at.desc()).all()
    return jsonify([{
        'id': j.id,
        'title': j.title,
        'description': j.description,
        'location': j.location,
        'company': j.company.name,
        'posted_at': j.posted_at.isoformat()
    } for j in jobs])

@api.route('/jobs', methods=['POST'])
def create_job():
    data = request.get_json() or {}
    title       = data.get('title')
    description = data.get('description')
    location    = data.get('location')
    comp_name   = data.get('company')

    if not (title and comp_name):
        return jsonify({"error": "title and company are required"}), 400

    company = Company.query.filter_by(name=comp_name).first()
    if not company:
        company = Company(name=comp_name)
        db.session.add(company)
        db.session.commit()

    job = Job(
        title=title,
        description=description,
        location=location,
        company_id=company.id
    )
    db.session.add(job)
    db.session.commit()

    return jsonify({'id': job.id}), 201
