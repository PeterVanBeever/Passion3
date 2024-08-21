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
)


# Create SQLAlchemy engine and session using configuration
engine = create_engine(Config.DATABASE_URL)
metadata.create_all(engine)
Session = sessionmaker(bind=engine)
