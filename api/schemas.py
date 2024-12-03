from pydantic import BaseModel
from typing import Optional

# Schema base para vídeos
class VideoBase(BaseModel):
    url: str
    is_gordox: bool

# Schema para criação de vídeos (input)
class VideoCreate(VideoBase):
    pass

# Schema para retorno de vídeos (output)
class Video(VideoBase):
    id: int

    class Config:
        orm_mode = True


# Schema base para respostas
class ResponseBase(BaseModel):
    video_id: int
    choice: str

# Schema para criação de respostas (input)
class ResponseCreate(ResponseBase):
    pass

# Schema para retorno de respostas (output)
class Response(ResponseBase):
    id: int

    class Config:
        orm_mode = True

