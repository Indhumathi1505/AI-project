package com.placement.ai.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "companyRequirements")
public class CompanyRequirement {
    @Id
    private String id;
    private String companyName;
    private List<String> requiredSkills;
    private double minCgpa;
}
