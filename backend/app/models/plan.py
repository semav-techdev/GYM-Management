from sqlalchemy import Boolean, Column, Float, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base


class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    duration = Column(String, default="monthly")
    description = Column(String)
    is_active = Column(Boolean, default=True)
    
    members = relationship("Member", back_populates="plan", cascade="all, delete-orphan")
