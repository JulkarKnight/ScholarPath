package com.scholarpath.controller;

import com.scholarpath.entity.StudentDocument;
import com.scholarpath.request.StudentDocumentRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/student-documents")
public class StudentDocumentController {

    private List<StudentDocument> studentDocsDb = new ArrayList<>();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("data", studentDocsDb);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody StudentDocumentRequest request) {
        request.validate();

        StudentDocument doc = new StudentDocument(
                UUID.randomUUID().toString(),
                request.getStudentId(),
                request.getDocReqId(),
                request.getIsCompleted(),
                request.getFileUrl()
        );
        studentDocsDb.add(doc);

        Map<String, Object> response = new HashMap<>();
        response.put("data", doc);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody StudentDocumentRequest request) {
        request.validate();

        for (int i = 0; i < studentDocsDb.size(); i++) {
            if (studentDocsDb.get(i).getStudentDocId().equals(id)) {
                StudentDocument updated = new StudentDocument(
                        id,
                        request.getStudentId(),
                        request.getDocReqId(),
                        request.getIsCompleted(),
                        request.getFileUrl()
                );
                studentDocsDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "Document not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = studentDocsDb.removeIf(d -> d.getStudentDocId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
