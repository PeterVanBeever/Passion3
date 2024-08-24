from flask import Flask
from config import Config
from challenges.data_routes import bp as data_bp
from challenges.validation_routes import bp as validation_bp
from challenges.routes import bp as challenges_bp

app = Flask(__name__)
app.config.from_object(Config)

# Register the blueprints
app.register_blueprint(challenges_bp, url_prefix='/challenges')

if __name__ == '__main__':
    app.run(debug=True)
