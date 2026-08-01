import json

import google.generativeai as genai
from fastapi import HTTPException

from app.config import settings

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

# Load Gemini Model
model = genai.GenerativeModel(settings.GEMINI_MODEL)


def analyze_resume(resume_text: str) -> dict:
    """
    Generates a structured AI resume review using Google Gemini.
    """

    prompt = f"""
You are an experienced Senior Technical Recruiter.

Analyze the following resume carefully.

Return ONLY valid JSON.

Do not return markdown.
Do not wrap the JSON inside triple backticks.
Do not include any explanation before or after the JSON.

Use this exact JSON structure:

{{
    "resume_score": 0,
    "ats_score": 0,
    "recruiter_confidence": 0,
    "first_impression": "",
    "assessment": "",
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "ats_observations": [],
    "top_improvements": []
}}

Scoring Guidelines:

Resume Score:
- Overall quality of the resume.
- Education
- Skills
- Projects
- Resume writing
- Formatting
- Professionalism

ATS Score:
- Keyword relevance
- ATS-friendly formatting
- Section organization
- Technical keyword coverage

Recruiter's Confidence:
- How confident you are in this evaluation (0-100).

Resume:

{resume_text}
"""

    try:
        response = model.generate_content(prompt)

        cleaned_response = response.text.strip()

        # Remove markdown formatting if Gemini returns it
        if cleaned_response.startswith("```json"):
            cleaned_response = cleaned_response.replace("```json", "", 1)

        if cleaned_response.endswith("```"):
            cleaned_response = cleaned_response[:-3]

        cleaned_response = cleaned_response.strip()

        return json.loads(cleaned_response)

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="Gemini returned an invalid JSON response."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate AI resume review: {str(e)}"
        )