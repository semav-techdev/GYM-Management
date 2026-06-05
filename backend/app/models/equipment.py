from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    category = Column(String)
    quantity = Column(Integer)
    status = Column(String, default="working")
    location = Column(String)
    last_maintenance = Column(String)
    notes = Column(String)