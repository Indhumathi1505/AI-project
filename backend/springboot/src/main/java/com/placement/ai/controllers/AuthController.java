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
        // In real app, encode password
        student.setRole("USER");
        studentRepository.save(student);
        return ResponseEntity.ok("Student registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Dummy implementation for now, in real scenario check password and generate JWT
        return ResponseEntity.ok(new JwtResponse("dummy-jwt-token"));
    }
}

class LoginRequest {
    public String email;
    public String password;
}

class JwtResponse {
    public String token;
    public JwtResponse(String token) { this.token = token; }
}
