package com.placement.ai.services;

import com.placement.ai.models.Student;
import com.placement.ai.models.Prediction;
import com.placement.ai.models.SkillGap;
import com.placement.ai.repositories.PredictionRepository;
import com.placement.ai.repositories.SkillGapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

@Service
public class PlacementService {

    @Autowired
    private PredictionRepository predictionRepository;
    
    @Autowired
    private SkillGapRepository skillGapRepository;

    public Prediction calculatePlacementScores(Student student) {
        // Simple logic for placement probability (Simulating Random Forest results until we connect to Python AI)
        double weightCgpa = 30, weightSkills = 25, weightProjects = 15, weightInternships = 20;

        double score = (student.getCgpa() / 10.0) * weightCgpa;
        score += Math.min(student.getSkills() != null ? student.getSkills().size() * 5 : 0, weightSkills);
        score += Math.min(student.getProjects() != null ? student.getProjects().size() * 5 : 0, weightProjects);
        score += Math.min(student.getInternships() != null ? student.getInternships().size() * 7.5 : 0, weightInternships);
        
        // Add random variation to mock the rest
        score += 10;
        double probability = Math.min(score, 100.0);
        
        Prediction prediction = new Prediction();
        prediction.setStudentId(student.getId());
        prediction.setPlacementProbability(probability);
        prediction.setReadinessScore((int) probability);
        return predictionRepository.save(prediction);
    }
    
    public SkillGap detectSkillGaps(Student student) {
        List<String> industrySkills = Arrays.asList("Java", "Python", "Data Structures", "Algorithms", "SQL", "Spring Boot", "React");
        List<String> gaps = new ArrayList<>();
        List<String> recommended = new ArrayList<>();
        
        List<String> studentSkills = student.getSkills() != null ? student.getSkills() : new ArrayList<>();
        
        for (String s : industrySkills) {
            boolean found = false;
            for(String stSkill : studentSkills) {
                if(stSkill.toLowerCase().contains(s.toLowerCase())) found = true;
            }
            if (!found) {
                gaps.add(s);
                recommended.add("Advanced course in " + s);
            }
        }
        
        SkillGap skillGap = new SkillGap();
        skillGap.setStudentId(student.getId());
        skillGap.setMissingSkills(gaps);
        skillGap.setRecommendedCourses(recommended);
        
        return skillGapRepository.save(skillGap);
    }
}
