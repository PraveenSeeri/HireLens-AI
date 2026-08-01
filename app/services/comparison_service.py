import json

from app.database.models.resume import Resume


def compare_resumes(old_resume: Resume, new_resume: Resume):
    """
    Compare two stored resume reviews.
    """

    old_strengths = json.loads(old_resume.strengths)
    new_strengths = json.loads(new_resume.strengths)

    old_weaknesses = json.loads(old_resume.weaknesses)
    new_weaknesses = json.loads(new_resume.weaknesses)

    added_strengths = [
        strength
        for strength in new_strengths
        if strength not in old_strengths
    ]

    resolved_weaknesses = [
        weakness
        for weakness in old_weaknesses
        if weakness not in new_weaknesses
    ]

    score_improvement = (
        new_resume.resume_score -
        old_resume.resume_score
    )

    ats_improvement = (
        new_resume.ats_score -
        old_resume.ats_score
    )

    confidence_improvement = (
        new_resume.recruiter_confidence -
        old_resume.recruiter_confidence
    )

    return {
        "old_resume_id": old_resume.id,
        "new_resume_id": new_resume.id,

        "old_resume_score": old_resume.resume_score,
        "new_resume_score": new_resume.resume_score,
        "score_improvement": score_improvement,

        "old_ats_score": old_resume.ats_score,
        "new_ats_score": new_resume.ats_score,
        "ats_improvement": ats_improvement,

        "old_confidence": old_resume.recruiter_confidence,
        "new_confidence": new_resume.recruiter_confidence,
        "confidence_improvement": confidence_improvement,

        "new_strengths": added_strengths,
        "resolved_weaknesses": resolved_weaknesses,

        "ai_summary": (
            f"Resume score improved by {score_improvement} points. "
            f"ATS score improved by {ats_improvement} points. "
            f"{len(added_strengths)} new strengths were identified and "
            f"{len(resolved_weaknesses)} weaknesses were resolved."
        )
    }