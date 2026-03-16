package com.placement.ai.controllers;

import com.placement.ai.models.Student;
import com.placement.ai.models.Prediction;
import com.placement.ai.models.SkillGap;
import com.placement.ai.services.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PredictionController {

    @Autowired
    private PlacementService placementService;

    @PostMapping("/predict-placement")
    public ResponseEntity<Prediction> predictPlacement(@RequestBody Student studentInput) {
        // We will call the Python FastAPI microservice here eventually.
        // For now, fallback to basic logic
        return ResponseEntity.ok(placementService.calculatePlacementScores(studentInput));
    }

    @PostMapping("/skill-gap")
    public ResponseEntity<SkillGap> getSkillGap(@RequestBody Student studentInput) {
        // We will call Python FastAPI here eventually.
        return ResponseEntity.ok(placementService.detectSkillGaps(studentInput));
    }
}
