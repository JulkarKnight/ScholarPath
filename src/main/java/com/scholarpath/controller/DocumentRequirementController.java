package com.scholarpath.controller;

import com.scholarpath.entity.DocumentRequirement;
import com.scholarpath.request.DocumentRequirementRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/document-requirements")
public class DocumentRequirementController {

    private List<DocumentRequirement> docReqsDb = new ArrayList<>();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("data", docReqsDb);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody DocumentRequirementRequest request) {
        request.validate();

        DocumentRequirement docReq = new DocumentRequirement(
                UUID.randomUUID().toString(),
                request.getTitleEn(),
                request.getCategory(),
                request.getRequiredForCountry()
        );
        docReqsDb.add(docReq);

        Map<String, Object> response = new HashMap<>();
        response.put("data", docReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody DocumentRequirementRequest request) {
        request.validate();

        for (int i = 0; i < docReqsDb.size(); i++) {
            if (docReqsDb.get(i).getDocReqId().equals(id)) {
                DocumentRequirement updated = new DocumentRequirement(
                        id,
                        request.getTitleEn(),
                        request.getCategory(),
                        request.getRequiredForCountry()
                );
                docReqsDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "Requirement not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = docReqsDb.removeIf(d -> d.getDocReqId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
