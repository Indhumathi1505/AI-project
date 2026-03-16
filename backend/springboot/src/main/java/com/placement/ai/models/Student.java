package com.placement.ai.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "students")
public class Student {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String department;
    private double cgpa;
    private List<String> skills;
    private List<String> projects;
    private List<String> internships;
    private List<String> certifications;
    private String resume; // URL or File path/ID
    
    // Calculated roles
    private String role; // "USER" or "ADMIN"
}
