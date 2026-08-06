import json
from datetime import UTC, datetime
from app.schemas.job_match import JobMatchResponse
from app.services.job_match_service import analyze_job_match

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.auth.models import User
from app.auth.utils import get_current_user
from app.schemas.comparison import ResumeComparison
from app.schemas.history import (
    ResumeDetail,
    ResumeHistoryItem,
)
from app.schemas.resume_review import ResumeUploadResponse
from app.schemas.stats import ResumeStats

from app.services.comparison_service import compare_resumes
from app.services.database_service import (
    delete_resume,
    get_all_resumes,
    get_resume_by_id,
    save_resume,
)
from app.services.file_service import save_uploaded_file
from app.services.gemini_service import analyze_resume
from app.services.pdf_service import extract_text_from_pdf
from app.services.statistics_service import (
    get_resume_statistics,
)

router = APIRouter()


@router.get("/")
def test_resume():
    """
    Test endpoint.
    """

    return {
        "message": "Resume API is working!"
    }


@router.get(
    "/history",
    response_model=list[ResumeHistoryItem]
)
def resume_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Get all uploaded resumes of the logged-in user.
    """

    resumes = get_all_resumes(
        db,
        current_user,
    )

    return [
        {
            "id": resume.id,
            "original_filename": resume.original_filename,
            "saved_filename": resume.saved_filename,
            "generated_at": resume.generated_at,
            "resume_score": resume.resume_score,
            "ats_score": resume.ats_score,
            "recruiter_confidence": resume.recruiter_confidence,
        }
        for resume in resumes
    ]


@router.get(
    "/stats",
    response_model=ResumeStats
)
def resume_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Dashboard statistics for the logged-in user.
    """

    return get_resume_statistics(
        db,
        current_user,
    )

@router.get(
    "/{resume_id}",
    response_model=ResumeDetail
)
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Get one resume.
    """

    resume = get_resume_by_id(
    db,
    resume_id,
    current_user,
    )
    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    return {
        "id": resume.id,
        "original_filename": resume.original_filename,
        "saved_filename": resume.saved_filename,
        "generated_at": resume.generated_at,
        "resume_score": resume.resume_score,
        "ats_score": resume.ats_score,
        "recruiter_confidence": resume.recruiter_confidence,
        "first_impression": resume.first_impression,
        "assessment": resume.assessment,
        "strengths": json.loads(resume.strengths),
        "weaknesses": json.loads(resume.weaknesses),
        "missing_skills": json.loads(resume.missing_skills),
        "ats_observations": json.loads(resume.ats_observations),
        "top_improvements": json.loads(resume.top_improvements),
    }


@router.get(
    "/compare/{old_id}/{new_id}",
    response_model=ResumeComparison
)
def compare_resume_versions(
    old_id: int,
    new_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Compare two resumes belonging to the logged-in user.
    """

    old_resume = get_resume_by_id(
        db,
        old_id,
        current_user,
    )

    new_resume = get_resume_by_id(
        db,
        new_id,
        current_user,
    )

    if old_resume is None:
        raise HTTPException(
            status_code=404,
            detail=f"Resume {old_id} not found."
        )

    if new_resume is None:
        raise HTTPException(
            status_code=404,
            detail=f"Resume {new_id} not found."
        )

    return compare_resumes(
        old_resume,
        new_resume
    )


@router.delete("/{resume_id}")
def remove_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Delete one resume belonging to the logged-in user.
    """

    resume = delete_resume(
        db,
        resume_id,
        current_user,
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    return {
        "message": "Resume deleted successfully."
    }

@router.post(
    "/compare-upload",
    response_model=ResumeComparison,
)
async def compare_uploaded_resume(
    resume_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Compare an existing stored resume with a newly uploaded resume.
    The uploaded resume is analyzed but NOT saved.
    """

    old_resume = get_resume_by_id(
        db,
        resume_id,
        current_user,
    )

    if old_resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found.",
        )

    # Save uploaded file temporarily
    file_path, _ = save_uploaded_file(file)

    # Extract text
    resume_text = extract_text_from_pdf(file_path)

    # Analyze uploaded resume
    new_review = analyze_resume(resume_text)

    # Temporary object for comparison
    class TempResume:
        pass

    new_resume = TempResume()

    new_resume.id = 0
    new_resume.resume_score = new_review["resume_score"]
    new_resume.ats_score = new_review["ats_score"]
    new_resume.recruiter_confidence = new_review["recruiter_confidence"]

    new_resume.strengths = json.dumps(
        new_review["strengths"]
    )

    new_resume.weaknesses = json.dumps(
        new_review["weaknesses"]
    )

    return compare_resumes(
        old_resume,
        new_resume,
    )
@router.post(
    "/job-match",
    response_model=JobMatchResponse,
)
async def job_match(
    file: UploadFile = File(...),
    job_description: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Compare a resume against a job description.
    """

    # Save uploaded PDF
    file_path, _ = save_uploaded_file(file)

    # Extract resume text
    resume_text = extract_text_from_pdf(file_path)

    # AI analysis
    result = analyze_job_match(
        resume_text=resume_text,
        job_description=job_description,
    )

    return result    


@router.post(
    "/upload",
    response_model=ResumeUploadResponse
)
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Upload, analyze and save a resume.
    """

    file_path, unique_filename = save_uploaded_file(file)

    resume_text = extract_text_from_pdf(file_path)

    resume_review = analyze_resume(resume_text)

    save_resume(
        db=db,
        user=current_user,
        original_filename=file.filename,
        saved_filename=unique_filename,
        resume_review=resume_review,
    )

    return {
        "message": "Resume uploaded successfully!",
        "original_filename": file.filename,
        "saved_filename": unique_filename,
        "generated_at": datetime.now(UTC).isoformat(),
        "resume_review": resume_review,
    }