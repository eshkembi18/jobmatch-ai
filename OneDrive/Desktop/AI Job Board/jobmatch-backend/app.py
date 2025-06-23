from flask import Flask
from routes.jobs import jobs_bp
from routes.companies import companies_bp
from routes.resume import resume_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(jobs_bp)
app.register_blueprint(companies_bp)
app.register_blueprint(resume_bp)

@app.route('/')
def home():
    return {"message": "JobMatch AI Backend is running!"}

if __name__ == '__main__':
    app.run(debug=True)

