import os
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.database import get_db
from api import models, schemas
from fastapi.security import HTTPBasic, HTTPBasicCredentials

router = APIRouter()

security = HTTPBasic()

REACT_APP_API_USERNAME = os.getenv("REACT_APP_API_USERNAME")
REACT_APP_API_PASSWORD = os.getenv("REACT_APP_API_PASSWORD")

users = {
    REACT_APP_API_USERNAME: REACT_APP_API_PASSWORD,
}

def authenticate_user(credentials: HTTPBasicCredentials = Depends(security)):
    username = credentials.username
    password = credentials.password

    if username in users and users[username] == password:
        return username
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas"
    )
            


@router.post("/videos/", response_model=schemas.VideoCreate)
def create_video(video: schemas.VideoCreate, db: Session = Depends(get_db), credentials: HTTPBasicCredentials = Depends(authenticate_user)):
    db_video = models.Video(url=video.url, is_gordox=video.is_gordox)
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

@router.get("/videos/", response_model=List[schemas.Video])
def get_videos(db: Session = Depends(get_db)):
    return db.query(models.Video).all()

@router.post("/responses/", response_model=schemas.ResponseCreate)
def create_response(response: schemas.ResponseCreate, db: Session = Depends(get_db)):
    db_response = models.Response(
        video_id=response.video_id,
        choice=response.choice
    )
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    return db_response

@router.get("/responses/", response_model=List[schemas.Response])
def get_responses(db: Session = Depends(get_db)):
    return db.query(models.Response).all()
