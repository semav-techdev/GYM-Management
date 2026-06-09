from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.plan import Plan
from app.schemas.plan import PlanCreate, PlanResponse


router = APIRouter(prefix="/plans")


@router.get("/", response_model=list[PlanResponse])
def get_plans(db: Session = Depends(get_db)):
    return db.query(Plan).all()


@router.get("/active", response_model=list[PlanResponse])
def get_active_plans(db: Session = Depends(get_db)):
    return db.query(Plan).filter(Plan.is_active.is_(True)).all()


@router.post("/", response_model=PlanResponse)
def create_plan(plan: PlanCreate, db: Session = Depends(get_db)):
    new_plan = Plan(**plan.dict())
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan


@router.put("/{id}", response_model=PlanResponse)
def update_plan(id: int, plan: PlanCreate, db: Session = Depends(get_db)):
    db_plan = db.query(Plan).filter(Plan.id == id).first()

    if not db_plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    for key, value in plan.dict().items():
        setattr(db_plan, key, value)

    db.commit()
    db.refresh(db_plan)
    return db_plan


@router.patch("/{id}/toggle", response_model=PlanResponse)
def toggle_plan(id: int, db: Session = Depends(get_db)):
    db_plan = db.query(Plan).filter(Plan.id == id).first()

    if not db_plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    db_plan.is_active = not db_plan.is_active
    db.commit()
    db.refresh(db_plan)
    return db_plan


@router.delete("/{id}")
def delete_plan(id: int, db: Session = Depends(get_db)):
    db_plan = db.query(Plan).filter(Plan.id == id).first()

    if not db_plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    db.delete(db_plan)
    db.commit()
    return {"message": "deleted"}
