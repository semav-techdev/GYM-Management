from pydantic import BaseModel
from typing import Optional

class EquipmentCreate(BaseModel):
    name: str
    category: str
    quantity: int
    location: Optional[str] = None
    last_maintenance: Optional[str] = None
    notes: Optional[str] = None

class EquipmentResponse(EquipmentCreate):
    id: int
    status: str

    class Config:
        from_attributes = True