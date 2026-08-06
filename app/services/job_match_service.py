import json

from app.services.gemini_service import model


def analyze_job_match(
    resume_text: str,
    job_description: str,
):
    """
    Compare resume against a job description using Gemini AI.
    """

    prompt = f"""
You are an expert technical recruiter.

Compare the following resume with the provided job description.

Resume:
--------------------
{resume_text}

Job Description:
--------------------
{job_description}

Return ONLY valid JSON.

Format:

{{
    "match_score": 85,
    "matching_skills": [
        "...",
        "..."
    ],
    "missing_skills": [
        "...",
        "..."
    ],
    "missing_keywords": [
        "...",
        "..."
    ],
    "recruiter_feedback": "...",
    "improvement_suggestions": [
        "...",
        "..."
    ]
}}
"""

    response = model.generate_content(prompt)

    cleaned = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)