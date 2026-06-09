from typing import Optional

from pydantic import BaseModel


class PlanCreate(BaseModel):
    name: str
    price: float
    duration: str = "monthly"
    description: Optional[str] = None


class PlanResponse(PlanCreate):
    id: int
    is_active: bool

    class Config:
        from_attributes = True
