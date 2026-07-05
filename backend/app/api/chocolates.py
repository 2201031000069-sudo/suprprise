from fastapi import APIRouter

from app.seed import get_random_chocolate

router = APIRouter()


@router.get("/api/v1/chocolate/random")
def random_chocolate():
    chocolate = get_random_chocolate()
    return {"name": chocolate["name"], "compliment": chocolate["compliment"]}
