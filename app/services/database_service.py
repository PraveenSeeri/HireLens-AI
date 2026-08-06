import json

from sqlalchemy.orm import Session

from app.auth.models import User
from app.database.models.resume import Resume


def save_resume(
    db: Session,
    user: User,
    original_filename: str,
    saved_filename: str,
    resume_review: dict,
):
    """
    Save complete AI review into database.
    """

    resume = Resume(
        user_id=user.id,

        original_filename=original_filename,
        saved_filename=saved_filename,

        resume_score=resume_review["resume_score"],
        ats_score=resume_review["ats_score"],
        recruiter_confidence=resume_review["recruiter_confidence"],

        first_impression=resume_review["first_impression"],
        assessment=resume_review["assessment"],

        strengths=json.dumps(resume_review["strengths"]),
        weaknesses=json.dumps(resume_review["weaknesses"]),
        missing_skills=json.dumps(resume_review["missing_skills"]),
        ats_observations=json.dumps(resume_review["ats_observations"]),
        top_improvements=json.dumps(resume_review["top_improvements"]),
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume


def get_all_resumes(
    db: Session,
    user: User,
):
    """
    Get all resumes uploaded by the logged-in user.
    """

    return (
        db.query(Resume)
        .filter(Resume.user_id == user.id)
        .order_by(Resume.generated_at.desc())
        .all()
    )


def get_resume_by_id(
    db: Session,
    resume_id: int,
    user: User,
):
    """
    Get a specific resume belonging to the logged-in user.
    """

    return (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == user.id,
        )
        .first()
    )


def delete_resume(
    db: Session,
    resume_id: int,
    user: User,
):
    """
    Delete a resume belonging to the logged-in user.
    """

    resume = get_resume_by_id(
        db=db,
        resume_id=resume_id,
        user=user,
    )

    if resume is None:
        return None

    db.delete(resume)
    db.commit()

    return resume