package com.placement.ai.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "predictions")
public class Prediction {
    @Id
    private String id;
    private String studentId;
    private double placementProbability;
    private int readinessScore;
}
