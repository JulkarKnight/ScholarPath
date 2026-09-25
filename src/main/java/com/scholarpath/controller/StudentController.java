package com.scholarpath.controller;

import com.scholarpath.entity.Student;
import com.scholarpath.request.StudentRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private List<Student> studentsDb = new ArrayList<>();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("data", studentsDb);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody StudentRequest request) {
        request.validate();

        Student student = new Student(
                UUID.randomUUID().toString(),
                request.getEmail(),
                request.getTargetCountry(),
                request.getTargetMajor(),
                request.getTargetDegree(),
                request.getCurrentCgpa(),
                request.getIeltsScore()
        );
        studentsDb.add(student);

        Map<String, Object> response = new HashMap<>();
        response.put("data", student);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody StudentRequest request) {
        request.validate();

        for (int i = 0; i < studentsDb.size(); i++) {
            if (studentsDb.get(i).getStudentId().equals(id)) {
                Student updated = new Student(
                        id,
                        request.getEmail(),
                        request.getTargetCountry(),
                        request.getTargetMajor(),
                        request.getTargetDegree(),
                        request.getCurrentCgpa(),
                        request.getIeltsScore()
                );
                studentsDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "Student not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = studentsDb.removeIf(s -> s.getStudentId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
