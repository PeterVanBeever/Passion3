from flask import Blueprint, jsonify
from sqlalchemy import select
from app.models import Session, category_values

bp = Blueprint('highlight', __name__)

@bp.route('/get_highlight_words', methods=['GET'])
def get_highlight_words():
    try:
        with Session() as session:
            query = select(category_values.c.option_value)
            result = session.execute(query)
            words = [row[0] for row in result]
        return jsonify(words)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
