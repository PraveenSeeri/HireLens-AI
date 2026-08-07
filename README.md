# 🤖 HireLens AI

<div align="center">

# AI-Powered Resume Intelligence Platform

### **See Your Resume Through a Recruiter's Eyes**

Analyze resumes, evaluate ATS compatibility, compare resumes, match resumes against job descriptions, and generate professional PDF reports using AI.

---

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)

</div>

---

# 📖 Overview

HireLens AI is a full-stack AI-powered Resume Intelligence Platform that helps job seekers evaluate and improve their resumes using recruiter-style analysis.

Instead of simply scoring resumes, HireLens AI simulates recruiter evaluation by providing ATS analysis, resume comparison, job matching, recruiter confidence, AI-generated feedback, and downloadable PDF reports.

---

# ✨ Features

## 🔐 Authentication

- Secure User Registration
- JWT Authentication
- Login & Logout
- Protected Routes

---

## 📄 AI Resume Analysis

Upload your resume and receive:

- Resume Score
- ATS Compatibility Score
- Recruiter Confidence Score
- First Impression
- Overall Assessment
- Resume Strengths
- Resume Weaknesses
- Missing Skills
- ATS Observations
- AI Improvement Suggestions

---

## ⚖ Resume Comparison

Compare two resumes side-by-side.

Features include:

- Resume Score Comparison
- ATS Score Comparison
- Recruiter Confidence Comparison
- Better Resume Identification
- Interactive Comparison Charts

---

## 🎯 AI Job Match

Compare your resume with any Job Description.

Outputs include:

- Job Match Score
- Matching Skills
- Missing Skills
- Missing Keywords
- Recruiter Feedback
- Improvement Suggestions

---

## 📊 Dashboard Analytics

Interactive Dashboard displaying:

- Total Uploaded Resumes
- Average Resume Score
- Average ATS Score
- Recruiter Confidence
- Highest Resume Score
- Latest Upload
- Interactive Charts

---

## 📄 PDF Report Generation

Generate professional PDF reports for:

- Resume Analysis
- Job Match Analysis

---

## 🌙 Modern User Interface

- Responsive Design
- Dark Mode
- Interactive Charts
- Animated Components
- Modern Dashboard
- Professional Cards
- Mobile Friendly

---

# 📸 Screenshots

Create a folder named **screenshots** inside the project root.

```
screenshots/
│
├── landing.png
├── login.png
├── dashboard.png
├── upload.png
├── analysis.png
├── comparison.png
├── jobmatch.png
└── history.png
```

Then update these images.

### Landing Page

```md
![Landing](screenshots/landing.png)
```

### Dashboard

```md
![Dashboard](screenshots/dashboard.png)
```

### Resume Analysis

```md
![Analysis](screenshots/analysis.png)
```

### Resume Comparison

```md
![Comparison](screenshots/comparison.png)
```

### Job Match

```md
![Job Match](screenshots/jobmatch.png)
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- React CountUp
- Chart.js
- React Hot Toast
- jsPDF
- React Icons

---

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Passlib (bcrypt)
- Uvicorn

---

## AI

- Google Gemini AI

---

## Database

- SQLite

---

# 🏗 Architecture

```
                 React + Vite
                      │
                 Axios API Calls
                      │
                 FastAPI Backend
                      │
        JWT Authentication Middleware
                      │
               SQLAlchemy ORM
                      │
                 SQLite Database
                      │
          Google Gemini AI Integration
```

---

# 📂 Project Structure

```
HireLens-AI
│
├── app
│   ├── api
│   ├── auth
│   ├── database
│   ├── schemas
│   ├── services
│   └── main.py
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── utils
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── uploads
├── screenshots
├── README.md
└── requirements.txt
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/PraveenSeeri/HireLens-AI.git

cd HireLens-AI
```

---

# Backend Setup

Create Virtual Environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
GEMINI_API_KEY=YOUR_API_KEY
SECRET_KEY=YOUR_SECRET_KEY
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/auth/register` |
| POST | `/auth/login` |

---

## Resume

| Method | Endpoint |
|---------|----------------------|
| POST | `/resume/analyze` |
| POST | `/resume/compare` |
| POST | `/resume/job-match` |
| GET | `/resume/history` |
| GET | `/resume/statistics` |

---

# Future Roadmap

- AI Resume Builder
- AI Cover Letter Generator
- Interview Question Generator
- Resume Timeline
- Recruiter Dashboard
- Cloud Deployment
- PostgreSQL Support
- Email Verification
- Password Reset

---

# 👨‍💻 Developer

## **Praveen Seeri**

📧 Email: **praveen79@gmail.com**

🔗 GitHub: **https://github.com/PraveenSeeri**

🔗 LinkedIn: *(Add your LinkedIn profile URL here)*

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork this repository and submit a pull request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

## ⭐ If you like this project, consider giving it a Star!

**Built with ❤️ by Praveen Seeri**

</div>