from flask import Flask, render_template
from flask_cors import CORS

# our shared SQLAlchemy instance
from db import db

# import models so they register with SQLAlchemy
import models

app = Flask(__name__, instance_relative_config=True)
CORS(app)
app.config.from_object('instance.config')
db.init_app(app)

# register the API routes blueprint
from routes import api as api_bp
app.register_blueprint(api_bp)

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/post-job')
def post_job_page():
    return render_template('post_job.html')

if __name__ == '__main__':
    # create tables on startup
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
