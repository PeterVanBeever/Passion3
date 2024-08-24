from flask import Blueprint, render_template, jsonify, request, current_app as app
from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError
from models import metadata, Session, challenges, category_values  # Import from models

# Create a Blueprint for routes
bp = Blueprint('routes', __name__)

@bp.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        bp.logger.error(f"Error in index route: {e}")
        return "An error occurred", 500

@bp.route('/get_highlight_words')
def get_highlight_words():
    try:
        with Session() as session:
            query = select(category_values.c.option_value)
            result = session.execute(query)
            highlight_words = [row[0] for row in result]  # Access the first item in each tuple
        return jsonify(highlight_words)
    except SQLAlchemyError as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({"error": "Database error"}), 500
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Unexpected error"}), 500
    


@bp.route('/validate_input', methods=['POST'])
def validate_input():
    try:
        data = request.get_json()
        user_input = data.get('input')
        challenge = data.get('challenge')
        challenge_id = challenge.get('challenge_id')

        if not challenge_id:
            return jsonify({"error": "Challenge ID is missing"}), 400

        with Session() as session:
            query = select(challenges.c.answer).where(challenges.c.challenge_id == challenge_id)
            correct_answer = session.execute(query).scalar()  # Fetch the scalar value directly

            if correct_answer is None:
                return jsonify({"error": "Challenge not found"}), 404

        is_valid = user_input.strip() == correct_answer.strip()

        return jsonify({"valid": is_valid, "answer": correct_answer})  # Include the correct answer in the response

    except SQLAlchemyError as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({"error": "Database error"}), 500
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Unexpected error"}), 500



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
                challenges.c.description,
                challenges.c.challenge_hint  # Include the hint in the query
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
    try:
        with Session() as session:
            query = select(challenges.c.challenge_hint).order_by(func.random()).limit(1)
            challenge_hint = session.execute(query).scalar()
            if not challenge_hint:
                raise ValueError("No hint found in the database")
        return jsonify({"hintDescription": challenge_hint})
    except SQLAlchemyError as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({"error": f"Database error: {str(e)}"}), 500
    except ValueError as e:
        app.logger.error(f"Value error: {e}")
        return jsonify({"error": f"Value error: {str(e)}"}), 400
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
    
    