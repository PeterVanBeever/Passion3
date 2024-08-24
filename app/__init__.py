from flask import Flask
from config import Config  # Import Config only

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Register blueprints or other initialization code here
    return app
