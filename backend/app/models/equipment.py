from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    # DB column is named 'category' — expose it as attribute 'type' for compatibility
    type = Column('category', String, nullable=True)

    quantity = Column(Integer, nullable=True)

    status = Column(String, nullable=True)

    # DB column 'last_maintenance' exists; map to attribute 'last_maintenance_date'
    last_maintenance_date = Column('last_maintenance', String, nullable=True)

    location = Column(String, nullable=True)
    notes = Column(String, nullable=True)