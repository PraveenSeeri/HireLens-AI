import os
import uuid

from fastapi import APIRouter, UploadFile, File
from app.services.pdf_service import extract_text_from_pdf

router = APIRouter()


@router.get("/")
def test_resume():
    return {
        "message": "Resume API is working!"
    }


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    file_path, unique_filename = save_uploaded_file(file)

    resume_text = extract_text_from_pdf(file_path)

    return {
        "message": "Resume uploaded successfully!",
        "original_filename": file.filename,
        "saved_filename": unique_filename,
        "file_path": file_path,
        "resume_text": resume_text
    }