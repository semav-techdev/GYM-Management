from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.employe import Employee
from app.models.equipment import Equipment
from app.models.member import Member

router = APIRouter(prefix="/dashboard")


class DashboardStats(BaseModel):
    members: int
    staff: int
    equipment: int


@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    return {
        "members": db.query(Member).count(),
        "staff": db.query(Employee).count(),
        "equipment": db.query(Equipment).count(),
    }
