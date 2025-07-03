from flask import Flask, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True)
CORS(app)

# Load config from instance/config.py
app.config.from_object('instance.config')

db = SQLAlchemy(app)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # Use port 5000 by default; debug for auto-reload
    app.run(debug=True, host='0.0.0.0', port=5000)
