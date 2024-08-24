from flask import Blueprint, jsonify
from sqlalchemy import select, func
from app.models import Session, challenges

bp = Blueprint('data', __name__)

@bp.route('/get_challenge_data')
def get_challenge_data():
    try:
        with Session() as session:
            query = select(
                challenges.c.challenge_id,
                challenges.c.description,
                challenges.c.challenge_hint,
                challenges.c.answer
            
                
            ).order_by(func.random()).limit(1)

            result = session.execute(query).fetchone()

            if result:
                challenge_data = dict(result._mapping)
                return jsonify(challenge_data)
            else:
                return jsonify({"error": "No challenge found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
