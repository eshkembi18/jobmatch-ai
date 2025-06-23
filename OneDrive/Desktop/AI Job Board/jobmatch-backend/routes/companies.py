from flask import Blueprint, jsonify

companies_bp = Blueprint('companies', __name__, url_prefix='/companies')

@companies_bp.route('/', methods=['GET'])
def get_companies():
    companies = [
        {
            "name": "Tech Corp",
            "industry": "Technology",
            "location": "San Francisco",
            "size": "1,000-5,000",
            "founded": 2015,
            "openings": 23,
            "values": ["Diversity", "Innovation"]
        },
        {
            "name": "Designify",
            "industry": "UX/UI",
            "location": "Remote",
            "size": "200-500",
            "founded": 2018,
            "openings": 9,
            "values": ["Creativity", "User-first"]
        }
    ]
    return jsonify(companies)
