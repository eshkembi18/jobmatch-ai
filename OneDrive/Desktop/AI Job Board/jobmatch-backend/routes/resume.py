from flask import Blueprint, request, jsonify

resume_bp = Blueprint('resume', __name__, url_prefix='/resume')

@resume_bp.route('/upload', methods=['POST'])
def upload_resume():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    return jsonify({"message": f"Resume '{file.filename}' uploaded successfully!"})
