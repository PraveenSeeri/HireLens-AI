from datetime import datetime, UTC

from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.resume_review import ResumeUploadResponse
from app.services.database_service import save_resume
from app.services.file_service import save_uploaded_file
from app.services.gemini_service import analyze_resume
from app.services.pdf_service import extract_text_from_pdf

router = APIRouter()


@router.get("/")
def test_resume():
    return {
        "message": "Resume API is working!"
    }


@router.post(
    "/upload",
    response_model=ResumeUploadResponse
)
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload a resume, analyze it using AI,
    save the result into the database,
    and return the review.
    """

    # Save uploaded PDF
    file_path, unique_filename = save_uploaded_file(file)

    # Extract text
    resume_text = extract_text_from_pdf(file_path)

    # AI Analysis
    resume_review = analyze_resume(resume_text)

    # Save into SQLite database
    save_resume(
        db=db,
        original_filename=file.filename,
        saved_filename=unique_filename,
        resume_review=resume_review
    )

    # Return API response
    return {
        "message": "Resume uploaded successfully!",
        "original_filename": file.filename,
        "saved_filename": unique_filename,
        "generated_at": datetime.now(UTC).isoformat(),
        "resume_review": resume_review
    }