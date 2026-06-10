from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.equipment import Equipment
from app.schemas.equipment import EquipmentCreate, EquipmentResponse

router = APIRouter(prefix="/equipment")

@router.post("/", response_model=EquipmentResponse)
def create_equipment(equipment: EquipmentCreate, db: Session = Depends(get_db)):
    data = equipment.dict()
    # Ensure we don't pass status twice (schema may include it) and only pass keys the model expects
    data.pop("status", None)
    allowed = {"name", "type", "quantity", "location", "last_maintenance_date", "notes"}
    filtered = {k: v for k, v in data.items() if k in allowed}
    new_equipment = Equipment(**filtered, status="working")
    db.add(new_equipment)
    db.commit()
    db.refresh(new_equipment)
    return new_equipment

@router.get("/", response_model=list[EquipmentResponse])
def get_equipment(db: Session = Depends(get_db)):
    return db.query(Equipment).all()

@router.put("/{id}", response_model=EquipmentResponse)
def update_equipment(id: int, equipment: EquipmentCreate, db: Session = Depends(get_db)):
    db_equipment = db.query(Equipment).filter(Equipment.id == id).first()
    data = equipment.dict()
    # Only update attributes that exist on the model
    allowed = {"name", "type", "quantity", "location", "last_maintenance_date", "notes", "status"}
    for key, value in data.items():
        if key in allowed:
            setattr(db_equipment, key, value)
    db.commit()
    db.refresh(db_equipment)
    return db_equipment

@router.delete("/{id}")
def delete_equipment(id: int, db: Session = Depends(get_db)):
    db_equipment = db.query(Equipment).filter(Equipment.id == id).first()
    db.delete(db_equipment)
    db.commit()
    return {"message": "deleted"}