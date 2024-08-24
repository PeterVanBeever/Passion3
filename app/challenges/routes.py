from flask import Blueprint
from .data_routes import bp as data_bp
from .validation_routes import bp as validation_bp

bp = Blueprint('challenges', __name__)

# Register the sub-blueprints
bp.register_blueprint(data_bp, url_prefix='/data')
bp.register_blueprint(validation_bp, url_prefix='/validate')
