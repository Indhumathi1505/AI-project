package com.placement.ai.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
import java.util.List;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ResumeController {

    @PostMapping("/resume-analysis")
    public ResponseEntity<?> analyzeResume(@RequestParam("file") MultipartFile file) {
        // Will route to Python FastAPI microservice
        Map<String, Object> mockResponse = new HashMap<>();
        mockResponse.put("extracted_skills", List.of("Java", "Spring Boot", "Git"));
        mockResponse.put("resume_score", 75);
        mockResponse.put("improvement_tips", List.of("Add more measurable metrics", "Include links to deployed projects"));
        return ResponseEntity.ok(mockResponse);
    }
}
