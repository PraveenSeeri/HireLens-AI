from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.models.resume import Resume


def get_resume_statistics(db: Session):
    """
    Returns dashboard statistics.
    """

    total_resumes = db.query(Resume).count()

    if total_resumes == 0:
        return {
            "total_resumes": 0,
            "average_resume_score": 0,
            "average_ats_score": 0,
            "average_recruiter_confidence": 0,
            "highest_resume_score": 0,
            "highest_ats_score": 0,
            "latest_upload": None,
        }

    return {
        "total_resumes": total_resumes,
        "average_resume_score": round(
            float(db.query(func.avg(Resume.resume_score)).scalar()),
            2,
        ),
        "average_ats_score": round(
            float(db.query(func.avg(Resume.ats_score)).scalar()),
            2,
        ),
        "average_recruiter_confidence": round(
            float(db.query(func.avg(Resume.recruiter_confidence)).scalar()),
            2,
        ),
        "highest_resume_score": db.query(
            func.max(Resume.resume_score)
        ).scalar(),
        "highest_ats_score": db.query(
            func.max(Resume.ats_score)
        ).scalar(),
        "latest_upload": db.query(
            func.max(Resume.generated_at)
        ).scalar(),
    }