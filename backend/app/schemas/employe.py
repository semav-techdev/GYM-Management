from pydantic import BaseModel
from typing import Optional
from datetime import date

class EmployeeCreate(BaseModel):
    name: str
    role: str
    phone: str
    salary: float
    email: Optional[str] = None
    hire_date: date
    specialization: Optional[str] = None

class EmployeeResponse(EmployeeCreate):
    id: int
    is_active: bool

    class Config:
        from_attributes = True