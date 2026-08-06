from datetime import UTC, datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from app.database.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # Relationship to User
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    user = relationship(
        "User",
        backref="resumes",
    )

    original_filename = Column(
        String,
        nullable=False,
    )

    saved_filename = Column(
        String,
        nullable=False,
    )

    generated_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC),
    )

    # Scores

    resume_score = Column(Integer)

    ats_score = Column(Integer)

    recruiter_confidence = Column(Integer)

    # Recruiter Review

    first_impression = Column(Text)

    assessment = Column(Text)

    # Stored as JSON strings

    strengths = Column(Text)

    weaknesses = Column(Text)

    missing_skills = Column(Text)

    ats_observations = Column(Text)

    top_improvements = Column(Text)