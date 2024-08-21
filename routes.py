from flask import Blueprint, render_template, jsonify, current_app as app
from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError
from models import Session, challenges  # Import from models

# Create a Blueprint for routes
bp = Blueprint('routes', __name__)

@bp.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        bp.logger.error(f"Error in index route: {e}")
        return "An error occurred", 500

@bp.route('/design')
def design():
    # Uncomment next line to check if route is working
    # return "Design Route Working"
    return render_template('index_design.html')

@bp.route('/get_challenge_data')
def get_challenge_data():
    try:
        with Session() as session:
            # Pass columns directly to select, not as a list
            query = select(
                challenges.c.challenge_id,
                challenges.c.description
                # Add other columns here as needed
            ).order_by(func.random()).limit(1)
            
            result = session.execute(query).fetchone()
        
        if result:
            # Convert result to a dictionary
            challenge_data = dict(result._mapping)
            return jsonify(challenge_data)
        else:
            return jsonify({"error": "No challenge found"}), 404
    except SQLAlchemyError as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({"error": f"Database error: {e}"}), 500
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        return jsonify({"error": f"Unexpected error: {e}"}), 500


@bp.route('/get_challenge_description')
def get_challenge_description():
    try:
        with Session() as session:
            query = select(challenges.c.description).order_by(func.random()).limit(1)
            challenge_description = session.execute(query).scalar()
        return jsonify({"challengeDescription": challenge_description})
    except SQLAlchemyError as e:
        bp.logger.error(f"Database error: {e}")
        return jsonify({"error": "Database error"}), 500
    except Exception as e:
        bp.logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Unexpected error"}), 500
    


@bp.route('/get_hint_description')
def get_hint_description():
    # Fetch the hint description from the database based on the challenge
    hint_description = "This is the hint description from the database."
    return jsonify({"hintDescription": hint_description})
