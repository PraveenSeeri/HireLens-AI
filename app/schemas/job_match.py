from pydantic import BaseModel


class JobMatchResponse(BaseModel):
    match_score: int

    matching_skills: list[str]

    missing_skills: list[str]

    missing_keywords: list[str]

    recruiter_feedback: str

    improvement_suggestions: list[str]