package com.scholarpath.controller;

import com.scholarpath.entity.University;
import com.scholarpath.request.UniversityRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/universities")
public class UniversityController {

    private List<University> universitiesDb = new ArrayList<>();

    @PostConstruct
    public void seedData() {
        universitiesDb.add(new University("u-toronto", "University of Toronto", "Canada", "Toronto, Ontario", 21, 38000, 14000, 3.5));
        universitiesDb.add(new University("u-ubc", "University of British Columbia (UBC)", "Canada", "Vancouver, BC", 34, 34000, 15000, 3.4));
        universitiesDb.add(new University("u-alberta", "University of Alberta", "Canada", "Edmonton, Alberta", 96, 23000, 11000, 3.0));
        universitiesDb.add(new University("u-tum", "Technical University of Munich (TUM)", "Germany", "Munich, Bavaria", 28, 4300, 12000, 3.3));
        universitiesDb.add(new University("u-rwth", "RWTH Aachen University", "Germany", "Aachen, NRW", 90, 0, 10500, 3.0));
        universitiesDb.add(new University("u-manchester", "University of Manchester", "UK", "Manchester", 32, 32000, 13000, 3.2));
        universitiesDb.add(new University("u-uiuc", "University of Illinois Urbana-Champaign (UIUC)", "USA", "Urbana, Illinois", 35, 36000, 13500, 3.5));
        universitiesDb.add(new University("u-unsw", "UNSW Sydney", "Australia", "Sydney, NSW", 19, 32000, 16000, 3.2));
        universitiesDb.add(new University("u-helsinki", "University of Helsinki", "Finland", "Helsinki", 115, 14000, 9500, 3.2));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double maxTuition,
            @RequestParam(required = false) Double minCgpa) {

        List<University> results = new ArrayList<>(universitiesDb);

        if (country != null && !country.isEmpty() && !"All".equals(country)) {
            results = results.stream()
                    .filter(u -> u.getCountry().equalsIgnoreCase(country))
                    .collect(Collectors.toList());
        }
        if (search != null && !search.isEmpty()) {
            String q = search.toLowerCase();
            results = results.stream()
                    .filter(u -> u.getName().toLowerCase().contains(q) || u.getCity().toLowerCase().contains(q))
                    .collect(Collectors.toList());
        }
        if (maxTuition != null) {
            results = results.stream()
                    .filter(u -> u.getTuitionFeeUsd() <= maxTuition)
                    .collect(Collectors.toList());
        }
        if (minCgpa != null) {
            results = results.stream()
                    .filter(u -> u.getMinCgpa() <= minCgpa)
                    .collect(Collectors.toList());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("count", results.size());
        response.put("data", results);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody UniversityRequest request) {
        request.validate();

        University university = new University(
                UUID.randomUUID().toString(),
                request.getName(),
                request.getCountry(),
                request.getCity(),
                request.getWorldRank(),
                request.getTuitionFeeUsd(),
                request.getLivingCostUsd(),
                request.getMinCgpa()
        );
        universitiesDb.add(university);

        Map<String, Object> response = new HashMap<>();
        response.put("data", university);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody UniversityRequest request) {
        request.validate();

        for (int i = 0; i < universitiesDb.size(); i++) {
            if (universitiesDb.get(i).getUniversityId().equals(id)) {
                University updated = new University(
                        id,
                        request.getName(),
                        request.getCountry(),
                        request.getCity(),
                        request.getWorldRank(),
                        request.getTuitionFeeUsd(),
                        request.getLivingCostUsd(),
                        request.getMinCgpa()
                );
                universitiesDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "University not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = universitiesDb.removeIf(u -> u.getUniversityId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
