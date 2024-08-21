from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import select, func
from sqlalchemy.exc import SQLAlchemyError
import pymysql
pymysql.install_as_MySQLdb()

# Import configuration
from config import Config



app = Flask(__name__)
app.config.from_object(Config)

# Define metadata
metadata = MetaData()

# Define the table with correct name and metadata
challenges = Table(
    'challenges', metadata,
    Column('id', Integer, primary_key=True),
    Column('description', String)
)

# Create SQLAlchemy engine and session using configuration
engine = create_engine(app.config['DATABASE_URL'])
metadata = MetaData()
Session = sessionmaker(bind=engine)
session = Session()

@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        app.logger.error(f"Error in index route: {e}")
        return "An error occurred", 500

   
@app.route('/design')
def design():
    # un-commnent next line to check if route is working
    # return "Design Route Working"
    return render_template('index_design.html')


@app.route('/get_challenge_description')
def get_challenge_description():
    try:
        query = select(challenges.c.description).order_by(func.random()).limit(1)
        result = session.execute(query).fetchone()
        if result:
            challenge_description = result[0]
            return jsonify({"challengeDescription": challenge_description})
        else:
            return jsonify({"challengeDescription": "No challenge description found"}), 404
    except SQLAlchemyError as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({"error": "Database error"}), 500
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Unexpected error"}), 500

@app.route('/get_hint_description')
def get_hint_description():
    # Fetch the hint description from the database based on the challenge
    hint_description = "This is the hint description from the database."
    return jsonify({"hintDescription": hint_description})

if __name__ == '__main__':
    app.run(debug=True)