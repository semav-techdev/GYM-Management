import os
from dotenv import load_dotenv

load_dotenv()

API_HOST = os.getenv("API_HOST")

API_PORT = os.getenv("API_PORT")

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is not set")

SECRET_KEY = os.getenv("SECRET_KEY")
if SECRET_KEY is None:
    raise ValueError("SECRET_KEY is not set")