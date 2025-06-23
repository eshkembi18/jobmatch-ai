from flask import Blueprint, jsonify, request

jobs_bp = Blueprint('jobs', __name__, url_prefix='/jobs')

@jobs_bp.route('/', methods=['GET'])
def get_jobs():
    keyword = request.args.get('keyword', '')
    jobs = [
        {"title": "UX Designer", "location": "Remote"},
        {"title": "Frontend Developer", "location": "NYC"},
        {"title": "Product Manager", "location": "San Francisco"},
    ]
    filtered = [job for job in jobs if keyword.lower() in job["title"].lower()]
    return jsonify(filtered)
