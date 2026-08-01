from datetime import UTC, datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

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