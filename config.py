import os

class Config:
    SECRET_KEY = 'your_secret_key'
    # You can use environment variables or hardcode values here
    DATABASE_URL = os.getenv('DATABASE_URL', 'mysql+pymysql://root:zipcode123@localhost/sqlv')

