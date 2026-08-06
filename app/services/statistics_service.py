from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth.models import User
from app.database.models.resume import Resume


def get_resume_statistics(
    db: Session,
    user: User,
):
    """
    Returns dashboard statistics for the logged-in user.
    """

    query = (
        db.query(Resume)
        .filter(Resume.user_id == user.id)
    )

    total_resumes = query.count()

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
            float(
                query.with_entities(
                    func.avg(Resume.resume_score)
                ).scalar()
            ),
            2,
        ),

        "average_ats_score": round(
            float(
                query.with_entities(
                    func.avg(Resume.ats_score)
                ).scalar()
            ),
            2,
        ),

        "average_recruiter_confidence": round(
            float(
                query.with_entities(
                    func.avg(Resume.recruiter_confidence)
                ).scalar()
            ),
            2,
        ),

        "highest_resume_score": query.with_entities(
            func.max(Resume.resume_score)
        ).scalar(),

        "highest_ats_score": query.with_entities(
            func.max(Resume.ats_score)
        ).scalar(),

        "latest_upload": query.with_entities(
            func.max(Resume.generated_at)
        ).scalar(),
    }