from fastapi import FastAPI
from api.database import engine, Base, create_tables
from api.routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

create_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Atualize para origens específicas em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(router)
