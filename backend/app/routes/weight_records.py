from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from calendar import monthrange

from app.core.database import get_db
from app.models.weight_record import WeightRecord
from app.models.member import Member
from app.schemas.weight_record import (
    WeightRecordCreate, 
    WeightRecordUpdate, 
    WeightRecordResponse,
    WeightRecordMonthResponse
)

router = APIRouter(prefix="/weight-records")

@router.post("/", response_model=WeightRecordResponse)
def create_weight_record(record: WeightRecordCreate, db: Session = Depends(get_db)):
    # Validate member exists
    member = db.query(Member).filter(Member.id == record.member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    # Ensure date is always 1st of month
    record_date = date(record.record_date.year, record.record_date.month, 1)
    
    # Check if record already exists for this month
    existing = db.query(WeightRecord).filter(
        WeightRecord.member_id == record.member_id,
        WeightRecord.record_date == record_date
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Weight record for this month already exists")
    
    new_record = WeightRecord(
        member_id=record.member_id,
        record_date=record_date,
        weight_before=record.weight_before,
        weight_after=record.weight_after
    )
    
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

@router.get("/member/{member_id}", response_model=List[WeightRecordResponse])
def get_member_weight_records(member_id: int, db: Session = Depends(get_db)):
    records = db.query(WeightRecord).filter(
        WeightRecord.member_id == member_id
    ).order_by(WeightRecord.record_date.desc()).all()
    return records

@router.get("/member/{member_id}/calendar", response_model=List[WeightRecordMonthResponse])
def get_member_weight_calendar(
    member_id: int, 
    year: Optional[int] = None, 
    db: Session = Depends(get_db)
):
    """Get weight records formatted as a calendar view for a year"""
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    if not year:
        year = date.today().year
    
    # Get all records for this member in the specified year
    records = db.query(WeightRecord).filter(
        WeightRecord.member_id == member_id,
        WeightRecord.record_date >= date(year, 1, 1),
        WeightRecord.record_date <= date(year, 12, 31)
    ).all()
    
    # Create a map of month -> record
    record_map = {}
    for r in records:
        month_key = r.record_date.strftime("%Y-%m")
        record_map[month_key] = r
    
    # Build 12 months
    calendar_data = []
    for month in range(1, 13):
        month_key = f"{year}-{month:02d}"
        if month_key in record_map:
            r = record_map[month_key]
            calendar_data.append(WeightRecordMonthResponse(
                month=month_key,
                weight_before=r.weight_before,
                weight_after=r.weight_after,
                has_record=True
            ))
        else:
            calendar_data.append(WeightRecordMonthResponse(
                month=month_key,
                weight_before=None,
                weight_after=None,
                has_record=False
            ))
    
    return calendar_data

@router.put("/{record_id}", response_model=WeightRecordResponse)
def update_weight_record(
    record_id: int, 
    record_update: WeightRecordUpdate, 
    db: Session = Depends(get_db)
):
    db_record = db.query(WeightRecord).filter(WeightRecord.id == record_id).first()
    if not db_record:
        raise HTTPException(status_code=404, detail="Weight record not found")
    
    update_data = record_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_record, key, value)
    
    db.commit()
    db.refresh(db_record)
    return db_record

@router.delete("/{record_id}")
def delete_weight_record(record_id: int, db: Session = Depends(get_db)):
    record = db.query(WeightRecord).filter(WeightRecord.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Weight record not found")
    
    db.delete(record)
    db.commit()
    return {"message": "Weight record deleted"}