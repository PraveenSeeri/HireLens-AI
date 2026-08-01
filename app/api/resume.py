from fastapi import APIRouter, UploadFile, File

router = APIRouter()


@router.get("/")
def test_resume():
    return {
        "message": "Resume API is working!"
    }


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    return {
        "filename": file.filename
    }