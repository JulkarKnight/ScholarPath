package com.scholarpath.entity;

public class ReadinessEvaluation {
    private String evaluationId;
    private String studentId;
    private double overallScore;
    private double academicScore;
    private double languageScore;
    private String readinessLevel;

    public ReadinessEvaluation() {
    }

    public ReadinessEvaluation(String evaluationId, String studentId, double overallScore,
                               double academicScore, double languageScore, String readinessLevel) {
        this.evaluationId = evaluationId;
        this.studentId = studentId;
        this.overallScore = overallScore;
        this.academicScore = academicScore;
        this.languageScore = languageScore;
        this.readinessLevel = readinessLevel;
    }

    public String getEvaluationId() { return evaluationId; }
    public void setEvaluationId(String evaluationId) { this.evaluationId = evaluationId; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public double getOverallScore() { return overallScore; }
    public void setOverallScore(double overallScore) { this.overallScore = overallScore; }

    public double getAcademicScore() { return academicScore; }
    public void setAcademicScore(double academicScore) { this.academicScore = academicScore; }

    public double getLanguageScore() { return languageScore; }
    public void setLanguageScore(double languageScore) { this.languageScore = languageScore; }

    public String getReadinessLevel() { return readinessLevel; }
    public void setReadinessLevel(String readinessLevel) { this.readinessLevel = readinessLevel; }
}
