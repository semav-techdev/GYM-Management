from datetime import date
from typing import Optional

from pydantic import BaseModel

class MemberCreate(BaseModel):
    name: str
    age: int
    plan_id: Optional[int] = None
    join_date: date
    expiry_date: date
    phone: str
    notes: Optional[str] = None
    actions: Optional[str] = None
    
class MemberResponse(BaseModel):
    id: int
    name: str
    age: int
    plan_id: Optional[int] = None
    join_date: date
    expiry_date: date
    phone: str
    notes: Optional[str]
    actions: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True