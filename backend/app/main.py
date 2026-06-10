from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from .core.database import engine
from .core.database import Base ,get_db
from .models.users import User
from .models.plan import Plan
from .schemas.user import UserCreate
from .routes.auth import (verify_password,create_access_token,hash_password)

from .routes.member import router as members_router
from .routes.employe import router as employees_router
from .routes.equipment import router as equipment_router
from .routes.dashboard import router as dashboard_router
from .routes.weight_records import router as weight_record_router
from .routes.plan import router as plan_router

Base.metadata.create_all(bind=engine) #Creates all database tables defined in models.py

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/register")
def register(user: UserCreate,db: Session = Depends(get_db)):
    
    hashed_password = hash_password(user.password)

    new_user = User(userName=user.userName,password=hashed_password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created"}
    
@app.post("/")
def login(
    user: UserCreate,
    db: Session = Depends(get_db)):
    
    db_user = db.query(User).filter(
        User.userName == user.userName
    ).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    password_valid = verify_password(user.password,db_user.password)

    if not password_valid:
        raise HTTPException(status_code=400, detail="Invalid password")

    access_token = create_access_token(
            data={"sub": db_user.userName})
    return {
        "success": True, 
        "message": "Login successful",
        "data":{
            "access_token": access_token,
            "user": {
            "userName": db_user.userName
        }
        }
    }

app.include_router(members_router)
app.include_router(employees_router)
app.include_router(equipment_router)
app.include_router(dashboard_router)
app.include_router(weight_record_router)
app.include_router(plan_router)
