from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from config import Config

# Define metadata
metadata = MetaData()

# Define tables
challenges = Table(
    'challenges', metadata,
    Column('challenge_id', Integer, primary_key=True),
    Column('description', String),
    Column('challenge_hint', String),
    Column('answer', String)
)

# Define a category_values table as well, if needed
category_values = Table(
    'category_values', metadata,
    Column('id', Integer, primary_key=True),
    Column('option_value', String, unique=True)
)

# Create SQLAlchemy engine and session
engine = create_engine(Config.DATABASE_URL)
metadata.create_all(engine)
Session = sessionmaker(bind=engine)
