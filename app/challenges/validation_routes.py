from flask import Blueprint, jsonify, request, current_app as app
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from app.models import Session, challenges

bp = Blueprint('validation', __name__)

@bp.route('/validate_input', methods=['POST'])
def validate_input():
    try:
        data = request.get_json()
        user_input = data.get('input')
        challenge = data.get('challenge')
        challenge_id = challenge.get('challenge_id')
        correct_answer = challenge.get('answer')

        print(f'User Input: {user_input}')  # Debugging line
        print(f'Challenge ID for Validation: {challenge_id}')  # Debugging line
        print(f'Correct Answer Received: {correct_answer}')  # Debugging line

        
        if not challenge_id:
            return jsonify({"error": "Challenge ID is missing"}), 400
        print(f'User Input: {user_input}')  # Debugging line
        print(f'Challenge ID for Validation: {challenge_id}')  # Debugging line

        with Session() as session:
            query = select(challenges.c.answer).where(challenges.c.challenge_id == challenge_id)
            correct_answer = session.execute(query).scalar()
        
            print(f'Correct Answer Retrieved: {correct_answer}')
              # Debugging line
            if correct_answer is None:
                return jsonify({"error": "Challenge not found"}), 404
        
        is_valid = user_input.strip() == correct_answer.strip()

        return jsonify({"valid": is_valid, "answer": correct_answer})
    except SQLAlchemyError as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({"error": "Database error"}), 500
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Unexpected error"}), 500
