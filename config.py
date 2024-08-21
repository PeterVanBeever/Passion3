import os

class Config:
    # You can use environment variables or hardcode values here
    DATABASE_URL = os.getenv('DATABASE_URL', 'mysql+pymysql://root:zipcode123@localhost/sqlv')
