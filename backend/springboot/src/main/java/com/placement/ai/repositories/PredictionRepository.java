package com.placement.ai.repositories;

import com.placement.ai.models.Prediction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PredictionRepository extends MongoRepository<Prediction, String> {
    Optional<Prediction> findByStudentId(String studentId);
}
