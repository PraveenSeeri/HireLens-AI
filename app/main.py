from fastapi import FastAPI

from app.api.resume import router as resume_router

# Database Imports
from app.database.database import Base, engine
from app.database.models.resume import Resume

app = FastAPI(
    title="HireLens AI",
    description="See your resume through a recruiter's eyes using AI-powered recruiter simulation, ATS analysis, interview prediction, and career insights.",
    version="1.0.0"
)

# Create all database tables
Base.metadata.create_all(bind=engine)

app.include_router(
    resume_router,
    prefix="/resume",
    tags=["Resume"]
)


@app.get(
    "/",
    tags=["Home"],
    summary="Welcome to HireLens AI"
)
def home():
    return {
        "title": "👋 Welcome to HireLens AI",
        "subtitle": "Your Personal AI Recruiter",
        "tagline": "See Your Resume Through a Recruiter's Eyes.",
        "description": "Upload your resume and experience how recruiters evaluate candidates in the first 30 seconds.",
        "version": "1.0.0"
    }