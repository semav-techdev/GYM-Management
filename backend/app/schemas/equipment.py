from datetime import date

from pydantic import BaseModel
from typing import Optional

class EquipmentCreate(BaseModel):
    name: str
    type: str
    model: Optional[str] = None
    quantity: int
    condition: str
    status: str
    purchase_date: date
    last_maintenance_date: Optional[date] = None
    next_maintenance_date: Optional[date] = None

    location: Optional[str] = None
    notes: Optional[str] = None

class EquipmentResponse(EquipmentCreate):
    id: int

    class Config:
        from_attributes = True