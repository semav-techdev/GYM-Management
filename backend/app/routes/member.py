from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.member import Member
from app.schemas.member import MemberCreate, MemberResponse

router = APIRouter(prefix="/members")

@router.post("/", response_model=MemberResponse)
def create_member(member: MemberCreate, db: Session = Depends(get_db)):

    new_member = Member(
        name=member.name,
        age=member.age,
        plan=member.plan,
        join_date=member.join_date,
        expiry_date=member.expiry_date,
        phone=member.phone,
        notes=member.notes,
        actions=member.actions
    )

    db.add(new_member)
    db.commit()
    db.refresh(new_member)

    return new_member


@router.get("/", response_model=List[MemberResponse])
def get_members(db: Session = Depends(get_db)):
    return db.query(Member).all()


@router.put("/{id}", response_model=MemberResponse)
def update_member(id: int, member: MemberCreate, db: Session = Depends(get_db)):

    db_member = db.query(Member).filter(Member.id == id).first()

    if not db_member:
        raise HTTPException(status_code=404, detail="Member not found")

    for key, value in member.dict().items():
        setattr(db_member, key, value)

    db.commit()
    db.refresh(db_member)

    return db_member


@router.delete("/{id}")
def delete_member(id: int, db: Session = Depends(get_db)):

    member = db.query(Member).filter(Member.id == id).first()

    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    db.delete(member)
    db.commit()

    return {"message": "deleted"}
