package com.scholarpath.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class StudentRequest {

    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "targetCountry is required")
    private String targetCountry;

    @NotBlank(message = "targetMajor is required")
    private String targetMajor;

    @NotBlank(message = "targetDegree is required")
    private String targetDegree;

    @NotNull(message = "currentCgpa is required")
    private Double currentCgpa;

    @NotNull(message = "ieltsScore is required")
    private Double ieltsScore;

    public StudentRequest() {
    }

    public void validate() {
        List<String> errors = new ArrayList<>();
        if (currentCgpa != null && (currentCgpa < 0 || currentCgpa > 4)) {
            errors.add("currentCgpa must be between 0 and 4");
        }
        if (ieltsScore != null && (ieltsScore < 0 || ieltsScore > 9)) {
            errors.add("ieltsScore must be between 0 and 9");
        }
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException("Validation failed: " + String.join("; ", errors));
        }
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTargetCountry() { return targetCountry; }
    public void setTargetCountry(String targetCountry) { this.targetCountry = targetCountry; }

    public String getTargetMajor() { return targetMajor; }
    public void setTargetMajor(String targetMajor) { this.targetMajor = targetMajor; }

    public String getTargetDegree() { return targetDegree; }
    public void setTargetDegree(String targetDegree) { this.targetDegree = targetDegree; }

    public Double getCurrentCgpa() { return currentCgpa; }
    public void setCurrentCgpa(Double currentCgpa) { this.currentCgpa = currentCgpa; }

    public Double getIeltsScore() { return ieltsScore; }
    public void setIeltsScore(Double ieltsScore) { this.ieltsScore = ieltsScore; }
}
