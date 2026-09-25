package com.scholarpath.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class ScholarshipRequest {

    @NotBlank(message = "title is required")
    private String title;

    @NotBlank(message = "country is required")
    private String country;

    @NotBlank(message = "coverage is required")
    private String coverage;

    @NotNull(message = "minCgpa is required")
    private Double minCgpa;

    @NotBlank(message = "deadline is required")
    private String deadline;

    public ScholarshipRequest() {
    }

    public void validate() {
        List<String> errors = new ArrayList<>();
        if (minCgpa != null && (minCgpa < 0 || minCgpa > 4)) {
            errors.add("minCgpa must be between 0 and 4");
        }
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException("Validation failed: " + String.join("; ", errors));
        }
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCoverage() { return coverage; }
    public void setCoverage(String coverage) { this.coverage = coverage; }

    public Double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
}
