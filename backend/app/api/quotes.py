from fastapi import APIRouter

from app.seed import get_random_quote

router = APIRouter()


@router.get("/api/v1/quotes/random")
def random_quote():
    quote = get_random_quote()
    return {"quote": quote}
