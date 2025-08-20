# app.py
import os
from flask import Flask, render_template, send_from_directory, redirect, url_for
from flask_cors import CORS
from db import db
from routes import api as api_bp   # <-- blueprint name inside routes.py is "api"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

def create_app():
    

    app = Flask(
        __name__,
        static_folder="static",      # serves /static/style.css, /static/main.js
        template_folder="templates"  # loads HTML from /templates
    )


    
    # ----- Config -----
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-change-me")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///app.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["UPLOAD_FOLDER"] = UPLOAD_DIR

    CORS(app, supports_credentials=True)

    # ----- DB -----
    db.init_app(app)
    with app.app_context():
        db.create_all()

    # ----- API (register AFTER app is created) -----
    app.register_blueprint(api_bp)   # mounts at /api/...

    # ----- Pages -----
    @app.get("/")
    def home():
        return render_template("index.html")

    @app.get("/index.html")
    def index_html():
        return redirect(url_for("home"), code=302)

    @app.get("/<page>")
    def page(page):
        # allow both "/about" and "/about.html"
        if page.endswith(".html"):
            page = page[:-5]

        allowed = {
            "about",
            "companies",
            "career_advice",
            "login",
            "register",
            "set_skills",
            "post_job",
        }
        if page in allowed:
            return render_template(f"{page}.html")
        return render_template("index.html"), 404

    # serve uploaded files (dev only)
    @app.get("/uploads/<path:filename>")
    def uploads(filename):
        return send_from_directory(UPLOAD_DIR, filename)

    # optional: simple 404 handler
    @app.errorhandler(404)
    def not_found(_e):
        return render_template("index.html"), 404

    print(f"[app] STATIC    = {app.static_folder}")
    print(f"[app] TEMPLATES = {app.template_folder}")
    print(f"[app] UPLOADS   = {UPLOAD_DIR}")
    return app
if __name__ == "__main__":
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    app = create_app()
    # ✅ single process, predictable logs/port
    app.run(host="127.0.0.1", port=5000, debug=True, use_reloader=False)

