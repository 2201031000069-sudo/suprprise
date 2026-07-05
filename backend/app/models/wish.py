from sqlalchemy import Column, DateTime, Integer, Text
from sqlalchemy.sql import func

from app.database import Base


class Wish(Base):
    __tablename__ = "wishes"

    id = Column(Integer, primary_key=True, index=True)
    wish_text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
