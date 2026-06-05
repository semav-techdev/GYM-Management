from pydantic import BaseModel
from typing import Optional

class EmployeeCreate(BaseModel):
    name: str
    role: str
    phone: str
    salary: float
    hire_date: str
    specialization: Optional[str] = None

class EmployeeResponse(EmployeeCreate):
    id: int
    is_active: bool

    class Config:
        from_attributes = True