from flask import Flask, render_template
from config import Config
from app.challenges.routes import bp as challenges_bp
from app.challenges.data_routes import bp as data_bp
from app.challenges.validation_routes import bp as validation_bp
from app.challenges.highlight_routes import bp as highlight_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    @app.route('/')
    def index():
        return render_template('index.html')

    # Register blueprints
    app.register_blueprint(highlight_bp, url_prefix='/highlight')
    app.register_blueprint(challenges_bp, url_prefix='/challenges')
    app.register_blueprint(data_bp, url_prefix='/challenges/data')
    app.register_blueprint(validation_bp, url_prefix='/validate')  # Ensure this matches

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
