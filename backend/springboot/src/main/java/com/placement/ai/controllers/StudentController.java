package com.placement.ai.controllers;

import com.placement.ai.models.Student;
import com.placement.ai.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/profile/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentRepository.findById(id).orElse(null);
    }

    @PutMapping("/update")
    public Student updateStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
