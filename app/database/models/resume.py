from sqlalchemy import Column, DateTime, Integer, String
from datetime import datetime, UTC

from app.database.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    original_filename = Column(String, nullable=False)

    saved_filename = Column(String, nullable=False)

    generated_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC)
    )

    resume_score = Column(Integer)

    ats_score = Column(Integer)

    recruiter_confidence = Column(Integer)