from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
import pymysql
pymysql.install_as_MySQLdb()

DATABASE_URL = "mysql+pymysql://root:zipcode123@localhost/sqlv"  # Update with your MySQL credentials

def test_connection():
    engine = create_engine(DATABASE_URL)
    try:
        # Attempt to connect to the database
        with engine.connect() as connection:
            print("Connection successful!")
    except SQLAlchemyError as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_connection()
