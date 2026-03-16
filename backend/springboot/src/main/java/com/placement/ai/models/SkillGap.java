package com.placement.ai.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "skillGaps")
public class SkillGap {
    @Id
    private String id;
    private String studentId;
    private List<String> missingSkills;
    private List<String> recommendedCourses;
}
