package com.scholarpath.controller;

import com.scholarpath.entity.Scholarship;
import com.scholarpath.request.ScholarshipRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/scholarships")
public class ScholarshipController {

    private List<Scholarship> scholarshipsDb = new ArrayList<>();

    @PostConstruct
    public void seedData() {
        scholarshipsDb.add(new Scholarship("s-daad", "DAAD EPOS / Master Scholarships", "Germany", "Full Funding", 3.0, "October 31"));
        scholarshipsDb.add(new Scholarship("s-erasmus", "Erasmus Mundus Joint Master Degree (EMJMD)", "Germany", "Full Funding", 3.3, "January 15"));
        scholarshipsDb.add(new Scholarship("s-chevening", "UK Chevening Scholarship", "UK", "Full Funding", 3.2, "November 5"));
        scholarshipsDb.add(new Scholarship("s-vanier", "Vanier Canada Graduate Scholarships", "Canada", "Full Funding", 3.7, "November 1"));
        scholarshipsDb.add(new Scholarship("s-fulbright", "Fulbright Foreign Student Program (USA)", "USA", "Full Funding", 3.3, "May 31"));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) Double cgpa) {

        List<Scholarship> results = new ArrayList<>(scholarshipsDb);

        if (country != null && !country.isEmpty() && !"All".equals(country)) {
            results = results.stream()
                    .filter(s -> s.getCountry().equalsIgnoreCase(country))
                    .collect(Collectors.toList());
        }
        if (cgpa != null) {
            results = results.stream()
                    .filter(s -> s.getMinCgpa() <= cgpa)
                    .collect(Collectors.toList());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("count", results.size());
        response.put("data", results);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody ScholarshipRequest request) {
        request.validate();

        Scholarship scholarship = new Scholarship(
                UUID.randomUUID().toString(),
                request.getTitle(),
                request.getCountry(),
                request.getCoverage(),
                request.getMinCgpa(),
                request.getDeadline()
        );
        scholarshipsDb.add(scholarship);

        Map<String, Object> response = new HashMap<>();
        response.put("data", scholarship);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody ScholarshipRequest request) {
        request.validate();

        for (int i = 0; i < scholarshipsDb.size(); i++) {
            if (scholarshipsDb.get(i).getScholarshipId().equals(id)) {
                Scholarship updated = new Scholarship(
                        id,
                        request.getTitle(),
                        request.getCountry(),
                        request.getCoverage(),
                        request.getMinCgpa(),
                        request.getDeadline()
                );
                scholarshipsDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "Scholarship not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = scholarshipsDb.removeIf(s -> s.getScholarshipId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
