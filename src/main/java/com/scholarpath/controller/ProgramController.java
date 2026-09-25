package com.scholarpath.controller;

import com.scholarpath.entity.Program;
import com.scholarpath.request.ProgramRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    private List<Program> programsDb = new ArrayList<>();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("data", programsDb);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody ProgramRequest request) {
        request.validate();

        Program program = new Program(
                UUID.randomUUID().toString(),
                request.getUniversityId(),
                request.getName(),
                request.getDegreeLevel()
        );
        programsDb.add(program);

        Map<String, Object> response = new HashMap<>();
        response.put("data", program);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody ProgramRequest request) {
        request.validate();

        for (int i = 0; i < programsDb.size(); i++) {
            if (programsDb.get(i).getProgramId().equals(id)) {
                Program updated = new Program(
                        id,
                        request.getUniversityId(),
                        request.getName(),
                        request.getDegreeLevel()
                );
                programsDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "Program not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = programsDb.removeIf(p -> p.getProgramId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
