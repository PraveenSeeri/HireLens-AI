import os

import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize Gemini model
model = genai.GenerativeModel(
    os.getenv("GEMINI_MODEL")
)


def analyze_resume(resume_text):
    """
    Analyze a resume using Gemini AI and return recruiter-style feedback.
    """

    prompt = f"""
You are an experienced Senior Technical Recruiter with over 15 years of hiring experience.

Analyze the following resume like a real recruiter.

Provide your response using the following sections.

## 1. Overall Resume Score
Give a score out of 100.

## 2. ATS Compatibility Score
Give an ATS score out of 100 and briefly explain it.

## 3. Recruiter's First Impression
Describe what you think within the first 30 seconds of reading the resume.

## 4. Strengths
List the strongest points of the resume.

## 5. Weaknesses
List the biggest weaknesses that may reduce interview chances.

## 6. Missing Skills
Mention important technical or soft skills that are missing.

## 7. Top 5 Resume Improvements
Provide five practical suggestions that would significantly improve this resume.

## 8. Recruiter Verdict
Choose ONE of the following:

- Strong Hire
- Hire
- Consider
- Reject

Explain your decision in 2–3 sentences.

Resume:

{resume_text}
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"Error while analyzing resume: {str(e)}"