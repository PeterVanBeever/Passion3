import os
from dotenv import load_dotenv
print(os.getcwd())
# Load environment variables from .env file
load_dotenv()

print("DATABASE_URL:", os.getenv('DATABASE_URL'))