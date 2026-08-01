from datetime import datetime
from pydantic import BaseModel


class ResumeStats(BaseModel):
    total_resumes: int

    average_resume_score: float
    average_ats_score: float
    average_recruiter_confidence: float

    highest_resume_score: int
    highest_ats_score: int

    latest_upload: datetime | None