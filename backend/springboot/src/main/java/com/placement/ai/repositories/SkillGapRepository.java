package com.placement.ai.repositories;

import com.placement.ai.models.SkillGap;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SkillGapRepository extends MongoRepository<SkillGap, String> {
    Optional<SkillGap> findByStudentId(String studentId);
}
