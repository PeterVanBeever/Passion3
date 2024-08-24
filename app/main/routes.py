from flask import Blueprint, render_template
from app.models import Session, challenges, category_values

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        bp.logger.error(f"Error in index route: {e}")
        return "An error occurred", 500

@bp.route('/design')
def design():
    return render_template('index_design.html')
