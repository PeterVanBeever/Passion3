from flask import Flask
from models import metadata, engine, Session, challenges  # Import from models
import pymysql
pymysql.install_as_MySQLdb()

# Import configuration
from config import Config

# Import routes
from routes import bp as routes_bp

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Register routes Blueprint
app.register_blueprint(routes_bp)

if __name__ == '__main__':
    app.run(debug=True)
