from sqlalchemy import Boolean, Column, Float, Integer, String
from app.core.database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    role = Column(String)
    phone = Column(String)
    salary = Column(Float)
    hire_date = Column(String)
    is_active = Column(Boolean, default=True)
    specialization = Column(String)