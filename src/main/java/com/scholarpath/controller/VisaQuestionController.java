package com.scholarpath.controller;

import com.scholarpath.entity.VisaQuestion;
import com.scholarpath.request.VisaQuestionRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/visa-questions")
public class VisaQuestionController {

    private List<VisaQuestion> visaQuestionsDb = new ArrayList<>();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("data", visaQuestionsDb);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody VisaQuestionRequest request) {
        request.validate();

        VisaQuestion question = new VisaQuestion(
                UUID.randomUUID().toString(),
                request.getCountry(),
                request.getCategory(),
                request.getQuestionText(),
                request.getSampleAnswer()
        );
        visaQuestionsDb.add(question);

        Map<String, Object> response = new HashMap<>();
        response.put("data", question);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody VisaQuestionRequest request) {
        request.validate();

        for (int i = 0; i < visaQuestionsDb.size(); i++) {
            if (visaQuestionsDb.get(i).getQuestionId().equals(id)) {
                VisaQuestion updated = new VisaQuestion(
                        id,
                        request.getCountry(),
                        request.getCategory(),
                        request.getQuestionText(),
                        request.getSampleAnswer()
                );
                visaQuestionsDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "Question not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = visaQuestionsDb.removeIf(q -> q.getQuestionId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
