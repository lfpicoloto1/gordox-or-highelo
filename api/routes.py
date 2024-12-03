from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import get_db
from api import models, schemas

router = APIRouter()


@router.post("/videos/", response_model=schemas.VideoCreate)
def create_video(video: schemas.VideoCreate, db: Session = Depends(get_db)):
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
