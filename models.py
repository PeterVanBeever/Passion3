from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from config import Config

# Define metadata
metadata = MetaData()

# Define the table with correct name and metadata
challenges = Table(
    'challenges', metadata,
    Column('challenge_id', Integer, primary_key=True),
    Column('description', String),
    Column('challenge_hint', String),  # Add the challenge_hint column here
    Column('answer', String)  # Add the answer column here
)

# New table for highlight words
category_values = Table(
    'category_values', metadata,
    Column('id', Integer, primary_key=True),
    Column('option_value', String, unique=True)  # Column to store words for highlighting
)

# Create SQLAlchemy engine and session using configuration
engine = create_engine(Config.DATABASE_URL)
metadata.create_all(engine)
Session = sessionmaker(bind=engine)
