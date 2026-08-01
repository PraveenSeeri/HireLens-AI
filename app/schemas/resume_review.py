from pydantic import BaseModel
from typing import List


class ResumeReview(BaseModel):
    resume_score: int
    ats_score: int
    recruiter_confidence: int
    first_impression: str
    assessment: str
    strengths: List[str]
    weaknesses: List[str]
    missing_skills: List[str]
    ats_observations: List[str]
    top_improvements: List[str]


class ResumeUploadResponse(BaseModel):
    message: str
    original_filename: str
    saved_filename: str
    generated_at: str
    resume_review: ResumeReview