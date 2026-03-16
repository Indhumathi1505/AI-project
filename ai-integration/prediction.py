def calculate_probability(student) -> float:
    # A mocked weight-based prediction imitating an ML model
    score = (student.cgpa / 10.0) * 30
    score += min(len(student.skills) * 5, 25)
    score += min(len(student.projects) * 5, 15)
    score += min(len(student.internships) * 7.5, 20)
    score += min(len(student.certifications) * 2.5, 10)
    return min(score, 100.0)

def analyze_skill_gap(student_skills: list):
    industry_skills = ["Python", "Java", "Machine Learning", "Data Structures", "SQL", "React", "Cloud"]
    student_skills_lower = [s.lower() for s in student_skills]
    
    missing = []
    recommended = []
    
    for req in industry_skills:
        found = any(req.lower() in s for s in student_skills_lower)
        if not found:
            missing.append(req)
            recommended.append(f"Master {req} through an online certification.")
            
    return missing, recommended
