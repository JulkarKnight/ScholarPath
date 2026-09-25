package com.scholarpath.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class ReadinessEvaluationRequest {

    @NotBlank(message = "studentId is required")
    private String studentId;

    @NotNull(message = "overallScore is required")
    private Double overallScore;

    @NotNull(message = "academicScore is required")
    private Double academicScore;

    @NotNull(message = "languageScore is required")
    private Double languageScore;

    @NotBlank(message = "readinessLevel is required")
    private String readinessLevel;

    public ReadinessEvaluationRequest() {
    }

    public void validate() {
        List<String> errors = new ArrayList<>();
        if (overallScore != null && (overallScore < 0 || overallScore > 100)) {
            errors.add("overallScore must be between 0 and 100");
        }
        if (academicScore != null && (academicScore < 0 || academicScore > 100)) {
            errors.add("academicScore must be between 0 and 100");
        }
        if (languageScore != null && (languageScore < 0 || languageScore > 100)) {
            errors.add("languageScore must be between 0 and 100");
        }
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException("Validation failed: " + String.join("; ", errors));
        }
    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public Double getOverallScore() { return overallScore; }
    public void setOverallScore(Double overallScore) { this.overallScore = overallScore; }

    public Double getAcademicScore() { return academicScore; }
    public void setAcademicScore(Double academicScore) { this.academicScore = academicScore; }

    public Double getLanguageScore() { return languageScore; }
    public void setLanguageScore(Double languageScore) { this.languageScore = languageScore; }

    public String getReadinessLevel() { return readinessLevel; }
    public void setReadinessLevel(String readinessLevel) { this.readinessLevel = readinessLevel; }
}
