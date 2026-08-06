from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.resume import router as resume_router
from app.auth.router import router as auth_router

from app.database.database import Base, engine
from app.database.models.resume import Resume
from app.auth.models import User

app = FastAPI(
    title="HireLens AI",
    description=(
        "See your resume through a recruiter's eyes using AI-powered "
        "recruiter simulation, ATS analysis, interview prediction, "
        "and career insights."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create all database tables
Base.metadata.create_all(bind=engine)

# Resume API
app.include_router(
    resume_router,
    prefix="/resume",
    tags=["Resume"],
)

# Authentication API
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"],
)


@app.get(
    "/",
    tags=["Home"],
    summary="Welcome to HireLens AI",
)
def home():
    return {
        "title": "👋 Welcome to HireLens AI",
        "subtitle": "Your Personal AI Recruiter",
        "tagline": "See Your Resume Through a Recruiter's Eyes.",
        "description": (
            "Upload your resume and experience how recruiters "
            "evaluate candidates in the first 30 seconds."
        ),
        "version": "1.0.0",
    }