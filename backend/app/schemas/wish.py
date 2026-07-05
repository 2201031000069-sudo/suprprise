from pydantic import BaseModel


class WishCreate(BaseModel):
    wish: str


class WishResponse(BaseModel):
    success: bool
    message: str
