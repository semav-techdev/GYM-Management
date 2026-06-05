from pydantic import BaseModel

# for validating and serializing user input data.
class UserCreate(BaseModel):
    userName: str #must be a string and is required
    password: str
    
class UserLogin(BaseModel):
    userName: str
    password: str   

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool
    is_active: bool

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse