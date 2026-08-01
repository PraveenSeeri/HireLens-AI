from datetime import datetime

from pydantic import BaseModel


class ResumeHistoryItem(BaseModel):
    id: int
    original_filename: str
    saved_filename: str
    generated_at: datetime
    resume_score: int
    ats_score: int
    recruiter_confidence: int


class ResumeDetail(BaseModel):
    id: int
    original_filename: str
    saved_filename: str
    generated_at: datetime

    resume_score: int
    ats_score: int
    recruiter_confidence: int

    first_impression: str
    assessment: str

    strengths: list[str]
    weaknesses: list[str]
    missing_skills: list[str]
    ats_observations: list[str]
    top_improvements: list[str]