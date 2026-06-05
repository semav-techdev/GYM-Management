from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from ..config import DATABASE_URL

def get_db():
    db = SessionLocal()

    try:
        yield db #Provides session to endpoint
    finally:
        db.close()

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# This creates:
# SQLite database
# database connection
# session manager
# base model system