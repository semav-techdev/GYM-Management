from sqlalchemy import Boolean, Column, Float, Integer, String,Date
from app.core.database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True)
    name = Column(String , nullable=False)
    role = Column(String,nullable=False)
    phone = Column(String)
    salary = Column(Float , nullable=True)
    email = Column(String, unique=True, nullable=True)
    hire_date = Column(Date)
    is_active = Column(Boolean, default=True)
    specialization = Column(String)