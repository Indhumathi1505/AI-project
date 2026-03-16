from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import prediction
import model_loader

app = FastAPI(title="Placement AI Microservice")

class StudentInput(BaseModel):
    cgpa: float
    skills: List[str]
    internships: List[str]
    projects: List[str]
    certifications: Optional[List[str]] = []

@app.on_event("startup")
def load_models():
    model_loader.init_models()

@app.post("/api/predict-placement")
def predict_placement(student: StudentInput):
    probability = prediction.calculate_probability(student)
    return {
        "placement_probability": probability,
        "readiness_score": int(probability)
    }

@app.post("/api/skill-gap")
def get_skill_gap(student: StudentInput):
    gaps, recommended = prediction.analyze_skill_gap(student.skills)
    return {
        "missing_skills": gap,
        "recommended_courses": recommended
    }

@app.post("/api/resume-analysis")
def analyze_resume():
    # To be implemented with file upload
    return {
        "extracted_skills": ["Java", "Python", "Machine Learning"],
        "resume_score": 85,
        "improvement_tips": ["Add more numerical metrics to achievements"]
    }

@app.get("/api/interview-questions")
def get_interview_questions():
    return {
        "technical_questions": [
            "Explain how a Transformer model works.",
            "Write a function to detect a cycle in a linked list."
        ],
        "hr_questions": [
            "What is your greatest weakness?",
            "Tell me about a time you failed."
        ]
    }
