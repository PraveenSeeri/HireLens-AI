from fastapi import APIRouter, UploadFile, File

from app.services.file_service import save_uploaded_file
from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import analyze_resume

router = APIRouter()


@router.get("/")
def test_resume():
    return {
        "message": "Resume API is working!"
    }


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    # Save uploaded resume
    file_path, unique_filename = save_uploaded_file(file)

    # Extract text from PDF
    resume_text = extract_text_from_pdf(file_path)

    # Analyze resume using Gemini AI
    analysis = analyze_resume(resume_text)

    # Return AI analysis
    return {
        "message": "Resume uploaded successfully!",
        "original_filename": file.filename,
        "saved_filename": unique_filename,
        "analysis": analysis
    }