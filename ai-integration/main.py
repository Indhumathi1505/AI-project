from fastapi import FastAPI, File, UploadFile
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
        "missing_skills": gaps,
        "recommended_courses": recommended
    }

@app.post("/api/resume-analysis")
async def analyze_resume(file: UploadFile = File(...)):
    # Read the file content
    content = await file.read()
    # In a real scenario, we'd use a PDF/Docx parser here.
    # For now, let's simulate by checking for keywords in the raw byte stream (crude but dynamic!)
    text = content.decode('utf-8', errors='ignore').lower()
    
    # Keyword sets
    skills_map = {
        "java": "Java", "spring": "Spring Boot", "react": "React", "python": "Python",
        "javascript": "JavaScript", "mongodb": "MongoDB", "sql": "SQL", "node": "Node.js",
        "aws": "AWS", "docker": "Docker", "kubernetes": "Kubernetes", "machine learning": "Machine Learning",
        "data science": "Data Science", "html": "HTML", "css": "CSS", "tail": "Tailwind CSS"
    }
    
    found_skills = []
    for key, val in skills_map.items():
        if key in text:
            found_skills.append(val)
            
    if not found_skills:
        found_skills = ["Java", "General Programming", "Problem Solving"] # Fallback

    # Domain Detection
    domain = "General Software Engineering"
    if any(k in text for k in ["data science", "machine learning", "ai", "model"]):
        domain = "Data Science & AI"
    elif any(k in text for k in ["react", "frontend", "html", "css", "web"]):
        domain = "Frontend Development"
    elif any(k in text for k in ["docker", "aws", "cloud", "devops", "kubernetes"]):
        domain = "DevOps & Cloud"
    elif any(k in text for k in ["backend", "java", "node", "spring"]):
        domain = "Backend Development"

    # Dynamic Score based on skill count
    score = min(40 + (len(found_skills) * 8), 98)
    
    return {
        "extracted_skills": found_skills,
        "resume_score": score,
        "domain": domain,
        "improvement_tips": [
            f"Focus on deep diving into {domain} core concepts.",
            "Add more quantitative results to your project descriptions.",
            "Ensuring your LinkedIn profile reflects these extracted skills."
        ]
    }

@app.get("/api/interview-questions")
def get_interview_questions(domain: Optional[str] = "General Software Engineering"):
    questions_map = {
        "Frontend Development": {
            "technical_questions": [
                "Explain the Virtal DOM and how React's reconciliation algorithm works.",
                "What are the differences between useMemo and useCallback hooks?",
                "How do you optimize a React application with high rendering frequency?",
                "Explain the box model and cascading priority in CSS."
            ],
            "hr_questions": [
                "How do you stay updated with the rapidly changing frontend ecosystem?",
                "Describe a time you had to fix a complex UI bug across multiple browsers."
            ]
        },
        "Backend Development": {
            "technical_questions": [
                "Explain the difference between optimistic and pessimistic locking in databases.",
                "How does Spring Boot manage dependency injection under the hood?",
                "What is a RESTful API and how does it differ from GraphQL?",
                "Describe the CAP theorem and its relevance to microservices."
            ],
            "hr_questions": [
                "How do you ensure the scalability of the systems you design?",
                "Tell me about a time you optimized a slow database query."
            ]
        },
        "Data Science & AI": {
            "technical_questions": [
                "What is the difference between L1 and L2 regularization?",
                "Explain the architecture of a Transformer model.",
                "How do you handle imbalanced datasets in classification tasks?",
                "What is the purpose of the activation function in neural networks?"
            ],
            "hr_questions": [
                "How do you explain complex ML models to non-technical stakeholders?",
                "Describe a project where you had to clean a large, messy dataset."
            ]
        },
        "DevOps & Cloud": {
            "technical_questions": [
                "What is Infrastructure as Code (IaC) and why is it important?",
                "Explain the CI/CD pipeline and the tools you prefer.",
                "How do Docker containers differ from Virtual Machines?",
                "What are the best practices for securing a cloud environment?"
            ],
            "hr_questions": [
                "How do you handle a system outage in a production environment?",
                "Tell me about your experience with automation and scripting."
            ]
        },
        "General Software Engineering": {
            "technical_questions": [
                "Explain how a Transformer model works.",
                "Write a function to detect a cycle in a linked list.",
                "What are SOLID principles in Object-Oriented Design?",
                "How do HTTP and HTTPS differ?"
            ],
            "hr_questions": [
                "What is your greatest weakness?",
                "Tell me about a time you failed."
            ]
        }
    }
    
    return questions_map.get(domain, questions_map["General Software Engineering"])
