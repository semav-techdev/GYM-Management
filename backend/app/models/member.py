from sqlalchemy import Boolean, Column, Date, Integer, String,ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)
    plan_id = Column(Integer, ForeignKey("plans.id"), nullable=True)
    join_date = Column(Date)
    expiry_date = Column(Date)
    is_active = Column(Boolean, default=True)
    phone = Column(String)
    notes = Column(String)
    actions = Column(String)
    
    plan = relationship("Plan", back_populates="members")
    weight_records = relationship("WeightRecord", back_populates="member", cascade="all, delete-orphan")