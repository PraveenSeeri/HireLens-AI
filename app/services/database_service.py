from sqlalchemy.orm import Session

from app.database.models.resume import Resume


def save_resume(
    db: Session,
    original_filename: str,
    saved_filename: str,
    resume_review: dict
):
    """
    Save a resume review into the database.
    """

    resume = Resume(
        original_filename=original_filename,
        saved_filename=saved_filename,
        resume_score=resume_review["resume_score"],
        ats_score=resume_review["ats_score"],
        recruiter_confidence=resume_review["recruiter_confidence"]
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume