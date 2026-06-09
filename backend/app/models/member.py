from sqlalchemy import Boolean, Column, Date, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)
    plan = Column(String)
    join_date = Column(Date)
    expiry_date = Column(Date)
    is_active = Column(Boolean, default=True)
    phone = Column(String)
    notes = Column(String)
    actions = Column(String)
    
    # Add this relationship
    weight_records = relationship("WeightRecord", back_populates="member", cascade="all, delete-orphan")