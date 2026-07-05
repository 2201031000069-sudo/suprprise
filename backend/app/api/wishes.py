from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.wish import Wish
from app.schemas.wish import WishCreate, WishResponse

router = APIRouter()


@router.post("/api/v1/wishes", response_model=WishResponse)
def create_wish(payload: WishCreate, db: Session = Depends(get_db)):
    wish = Wish(wish_text=payload.wish)
    db.add(wish)
    db.commit()
    db.refresh(wish)
    return WishResponse(success=True, message="Wish saved successfully.")
