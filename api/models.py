from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from api.database import Base


class Video(Base):
    __tablename__ = "videos"
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, nullable=False)
    is_gordox = Column(Boolean, nullable=False)
    

class Response(Base):
    __tablename__ = "responses"
    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey("videos.id"))
    choice = Column(String, nullable=False)
    created_at = Column(String)
