from typing import Optional

from pydantic import BaseModel

class MemberCreate(BaseModel):
    name: str
    age: int
    plan: str
    join_date: str
    expiry_date: str
    phone: str
    notes: Optional[str] = None
    actions: Optional[str] = None
    
class MemberResponse(BaseModel):
    id: int
    name: str
    age: int
    plan: str
    join_date: str
    expiry_date: str
    phone: str
    notes: Optional[str]
    actions: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True