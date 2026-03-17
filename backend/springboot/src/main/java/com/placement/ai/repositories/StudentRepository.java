package com.placement.ai.repositories;

import com.placement.ai.models.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    Student findByEmail(String email);
}
