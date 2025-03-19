from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
from typing import Optional
import jwt, os, bcrypt
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# FastAPI setup
app = FastAPI()
router = APIRouter()

# Static files and templates
app.mount("/", StaticFiles(directory="."), name="static")
templates = Jinja2Templates(directory=".")

# MongoDB setup
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["user_db"]
users_collection = db["users"]
history_collection = db["history"]

# Authentication setup
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Function to create JWT tokens
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=30))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Serve the login page
@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("app.html", {"request": request})

# Serve the app page after login
@app.get("/app", response_class=HTMLResponse)
async def read_app(request: Request, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        # Save visit history
        history = {"username": username, "visited_at": datetime.utcnow()}
        await history_collection.insert_one(history)

        return templates.TemplateResponse("index.html", {"request": request, "username": username})
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# User registration endpoint
@router.post("/register")
async def register(form_data: OAuth2PasswordRequestForm = Depends()):
    existing_user = await users_collection.find_one({"username": form_data.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = bcrypt.hashpw(form_data.password.encode("utf-8"), bcrypt.gensalt())
    new_user = {"username": form_data.username, "password": hashed_password}
    await users_collection.insert_one(new_user)
    return {"message": "User registered successfully"}

# Login endpoint
@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await users_collection.find_one({"username": form_data.username})
    if not user or not bcrypt.checkpw(form_data.password.encode("utf-8"), user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user["username"]})
    response = RedirectResponse(url="/app", status_code=status.HTTP_302_FOUND)
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    return response

# Logout endpoint
@router.get("/logout")
async def logout():
    response = RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    response.delete_cookie(key="access_token")
    return response

app.include_router(router, prefix="/auth", tags=["auth"])
