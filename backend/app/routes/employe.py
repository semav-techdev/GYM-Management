from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.employe import Employee
from app.schemas.employe import EmployeeCreate,EmployeeResponse

router = APIRouter(prefix="/employees")

@router.post("/", response_model=EmployeeResponse)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    new_employee = Employee(**employee.dict())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

@router.get("/", response_model=list[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

@router.put("/{id}", response_model=EmployeeResponse)
def update_employee(id: int, employee: EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = db.query(Employee).filter(Employee.id == id).first()
    for key, value in employee.dict().items():
        setattr(db_employee, key, value)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@router.delete("/{id}")
def delete_employee(id: int, db: Session = Depends(get_db)):
    db_employee = db.query(Employee).filter(Employee.id == id).first()
    db.delete(db_employee)
    db.commit()
    return {"message": "deleted"}