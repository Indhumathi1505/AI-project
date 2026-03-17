package com.placement.ai.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.placement.ai.models.Student;
import com.placement.ai.repositories.StudentRepository;
import com.placement.ai.services.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private PlacementService placementService;

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/resume-analysis")
    public ResponseEntity<?> analyzeResume(@RequestParam("file") MultipartFile file, @RequestParam("studentId") String studentId) {
        Map<String, Object> result = placementService.analyzeResume(file, studentId);
        
        // Update student skills in DB
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            List<String> extractedSkills = (List<String>) result.get("extracted_skills");
            if (extractedSkills != null) {
                student.setSkills(extractedSkills);
                studentRepository.save(student);
            }
        }
        
        return ResponseEntity.ok(result);
    }
}
