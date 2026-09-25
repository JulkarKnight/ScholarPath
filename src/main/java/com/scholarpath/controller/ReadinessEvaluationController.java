package com.scholarpath.controller;

import com.scholarpath.entity.ReadinessEvaluation;
import com.scholarpath.request.ReadinessEvaluationRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/readiness-evaluations")
public class ReadinessEvaluationController {

    private List<ReadinessEvaluation> evaluationsDb = new ArrayList<>();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("data", evaluationsDb);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody ReadinessEvaluationRequest request) {
        request.validate();

        ReadinessEvaluation evaluation = new ReadinessEvaluation(
                UUID.randomUUID().toString(),
                request.getStudentId(),
                request.getOverallScore(),
                request.getAcademicScore(),
                request.getLanguageScore(),
                request.getReadinessLevel()
        );
        evaluationsDb.add(evaluation);

        Map<String, Object> response = new HashMap<>();
        response.put("data", evaluation);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody ReadinessEvaluationRequest request) {
        request.validate();

        for (int i = 0; i < evaluationsDb.size(); i++) {
            if (evaluationsDb.get(i).getEvaluationId().equals(id)) {
                ReadinessEvaluation updated = new ReadinessEvaluation(
                        id,
                        request.getStudentId(),
                        request.getOverallScore(),
                        request.getAcademicScore(),
                        request.getLanguageScore(),
                        request.getReadinessLevel()
                );
                evaluationsDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "Evaluation not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = evaluationsDb.removeIf(e -> e.getEvaluationId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
