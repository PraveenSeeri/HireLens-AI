from pydantic import BaseModel


class ResumeComparison(BaseModel):
    old_resume_id: int
    new_resume_id: int

    old_resume_score: int
    new_resume_score: int
    score_improvement: int

    old_ats_score: int
    new_ats_score: int
    ats_improvement: int

    old_confidence: int
    new_confidence: int
    confidence_improvement: int

    new_strengths: list[str]
    resolved_weaknesses: list[str]

    ai_summary: str