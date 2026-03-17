package com.placement.ai.services;

import com.placement.ai.models.Student;
import com.placement.ai.models.Prediction;
import com.placement.ai.models.SkillGap;
import com.placement.ai.repositories.PredictionRepository;
import com.placement.ai.repositories.SkillGapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ByteArrayResource;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@Service
public class PlacementService {

    @Autowired
    private PredictionRepository predictionRepository;
    
    @Autowired
    private SkillGapRepository skillGapRepository;

    public Prediction calculatePlacementScores(Student student) {
        RestTemplate restTemplate = new RestTemplate();
        String aiUrl = "http://localhost:8000/api/predict-placement";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("cgpa", student.getCgpa());
        requestBody.put("skills", student.getSkills() != null ? student.getSkills() : new ArrayList<>());
        requestBody.put("internships", student.getInternships() != null ? student.getInternships() : new ArrayList<>());
        requestBody.put("projects", student.getProjects() != null ? student.getProjects() : new ArrayList<>());

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        
        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(aiUrl, request, Map.class);
            Map<String, Object> aiResult = response.getBody();
            
            double probability = Double.parseDouble(aiResult.get("placement_probability").toString());
            int readiness = (int) Double.parseDouble(aiResult.get("readiness_score").toString());
            
            Prediction prediction = new Prediction();
            prediction.setStudentId(student.getId());
            prediction.setPlacementProbability(probability);
            prediction.setReadinessScore(readiness);
            return predictionRepository.save(prediction);
        } catch(Exception e) {
             System.out.println("AI Service Error: " + e.getMessage());
             // Fallback
             Prediction prediction = new Prediction();
             prediction.setStudentId(student.getId());
             prediction.setPlacementProbability(40.0);
             prediction.setReadinessScore(40);
             return predictionRepository.save(prediction);
        }
    }
    
    public SkillGap detectSkillGaps(Student student) {
        RestTemplate restTemplate = new RestTemplate();
        String aiUrl = "http://localhost:8000/api/skill-gap";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("cgpa", student.getCgpa());
        requestBody.put("skills", student.getSkills() != null ? student.getSkills() : new ArrayList<>());
        requestBody.put("internships", student.getInternships() != null ? student.getInternships() : new ArrayList<>());
        requestBody.put("projects", student.getProjects() != null ? student.getProjects() : new ArrayList<>());

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(aiUrl, request, Map.class);
            Map<String, Object> aiResult = response.getBody();
            
            List<String> gaps = (List<String>) aiResult.get("missing_skills");
            List<String> recommended = (List<String>) aiResult.get("recommended_courses");
            
            SkillGap skillGap = new SkillGap();
            skillGap.setStudentId(student.getId());
            skillGap.setMissingSkills(gaps);
            skillGap.setRecommendedCourses(recommended);
            
            return skillGapRepository.save(skillGap);
        } catch(Exception e) {
             System.out.println("AI Service Error: " + e.getMessage());
             return new SkillGap(); // fallback
        }
    }

    public Map<String, Object> analyzeResume(MultipartFile file, String studentId) {
        RestTemplate restTemplate = new RestTemplate();
        String aiUrl = "http://localhost:8000/api/resume-analysis";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            });

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(aiUrl, requestEntity, Map.class);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Error in PlacementService.analyzeResume: " + e.getMessage());
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("extracted_skills", List.of("Java", "General Programming"));
            fallback.put("resume_score", 50);
            fallback.put("improvement_tips", List.of("Could not connect to AI Service. Check server status."));
            return fallback;
        }
    }
}
