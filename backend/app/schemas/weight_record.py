from pydantic import BaseModel
from typing import Optional
from datetime import date

class WeightRecordCreate(BaseModel):
    member_id: int
    record_date: date  # Format: YYYY-MM-DD (always use 1st of month)
    weight_before: Optional[float] = None
    weight_after: Optional[float] = None

class WeightRecordUpdate(BaseModel):
    weight_before: Optional[float] = None
    weight_after: Optional[float] = None

class WeightRecordResponse(BaseModel):
    id: int
    member_id: int
    record_date: date
    weight_before: Optional[float]
    weight_after: Optional[float]

    class Config:
        from_attributes = True

class WeightRecordMonthResponse(BaseModel):
    month: str  # Format: "2024-01"
    weight_before: Optional[float]
    weight_after: Optional[float]
    has_record: bool