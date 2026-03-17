package com.placement.ai.controllers;

import com.placement.ai.models.Student;
import com.placement.ai.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {
        try {
            student.setRole("USER");
            studentRepository.save(student);
            return ResponseEntity.ok(java.util.Map.of("message", "Registration successful", "studentId", student.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Find user by email
        Student student = studentRepository.findByEmail(loginRequest.username);
        
        if (student != null && student.getPassword().equals(loginRequest.password)) {
            // Found student
            return ResponseEntity.ok(java.util.Map.of(
                "token", "dummy-jwt-token-" + student.getId(),
                "user", student
            ));
        }
        
        return ResponseEntity.status(401).body(java.util.Map.of("error", "Invalid email or password"));
    }
}

class LoginRequest {
    public String username; // Frontend sends 'username' because of aiApi.login({username: ...})
    public String password;
}
