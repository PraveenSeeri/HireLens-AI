from fastapi import FastAPI

app = FastAPI(
    title="AI Resume Analyzer",
    description="An AI-powered application to analyze resumes and provide feedback.",
    version="1.0.0"
)


@app.get("/")
def home():
    return {"message": "Welcome to AI Resume Analyzer!"}