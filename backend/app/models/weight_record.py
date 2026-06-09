from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class WeightRecord(Base):
    __tablename__ = "weight_records"

    id = Column(Integer, primary_key=True)
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False)
    record_date = Column(Date, nullable=False)  # First day of the month
    weight_before = Column(Float, nullable=True)
    weight_after = Column(Float, nullable=True)
    
    # Relationship to member
    member = relationship("Member", back_populates="weight_records")