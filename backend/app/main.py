from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.quotes import router as quotes_router
from app.api.chocolates import router as chocolates_router
from app.api.wishes import router as wishes_router
from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    from alembic import command
    from alembic.config import Config
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")
    yield


app = FastAPI(title="Morning Cards API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quotes_router)
app.include_router(chocolates_router)
app.include_router(wishes_router)


@app.get("/")
def root():
    return {"message": "Morning Cards API is running"}
