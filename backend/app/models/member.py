from sqlalchemy import Boolean, Column, Integer, String
from app.core.database import Base

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    age =Column(Integer)
    plan =Column(String)
    join_date =Column(String)
    expiry_date =Column(String)
    is_active=Column(Boolean,default=True)
    phone = Column(String)
    notes=Column(String)
    actions=Column(String)