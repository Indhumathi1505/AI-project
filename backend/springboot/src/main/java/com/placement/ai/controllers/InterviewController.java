package com.placement.ai.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class InterviewController {

    @GetMapping("/interview-questions")
    public ResponseEntity<?> getInterviewQuestions() {
        // Will route to Python FastAPI microservice
        Map<String, Object> mockResponse = new HashMap<>();
        mockResponse.put("technical_questions", List.of(
            "Explain the difference between interface and abstract class in Java.",
            "How does Spring Boot auto-configuration work?"
        ));
        mockResponse.put("hr_questions", List.of(
            "Tell me about a time you faced a difficult challenge and how you overcame it.",
            "Where do you see yourself in 5 years?"
        ));
        return ResponseEntity.ok(mockResponse);
    }
}
