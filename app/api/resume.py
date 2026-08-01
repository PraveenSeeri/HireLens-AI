from datetime import datetime, UTC

from fastapi import APIRouter, UploadFile, File

from app.schemas.resume_review import ResumeUploadResponse
from app.services.file_service import save_uploaded_file
from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import analyze_resume

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
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload a resume, extract text, analyze it using AI,
    and return a structured resume review.
    """

    # Save uploaded file
    file_path, unique_filename = save_uploaded_file(file)

    # Extract text from PDF
    resume_text = extract_text_from_pdf(file_path)

    # Generate AI Resume Review
    resume_review = analyze_resume(resume_text)

    # Return structured response
    return {
        "message": "Resume uploaded successfully!",
        "original_filename": file.filename,
        "saved_filename": unique_filename,
        "generated_at": datetime.now(UTC).isoformat(),
        "resume_review": resume_review
    }