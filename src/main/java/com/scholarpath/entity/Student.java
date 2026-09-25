package com.scholarpath.entity;

public class Student {
    private String studentId;
    private String email;
    private String targetCountry;
    private String targetMajor;
    private String targetDegree;
    private double currentCgpa;
    private double ieltsScore;

    public Student() {
    }

    public Student(String studentId, String email, String targetCountry, String targetMajor,
                   String targetDegree, double currentCgpa, double ieltsScore) {
        this.studentId = studentId;
        this.email = email;
        this.targetCountry = targetCountry;
        this.targetMajor = targetMajor;
        this.targetDegree = targetDegree;
        this.currentCgpa = currentCgpa;
        this.ieltsScore = ieltsScore;
    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTargetCountry() { return targetCountry; }
    public void setTargetCountry(String targetCountry) { this.targetCountry = targetCountry; }

    public String getTargetMajor() { return targetMajor; }
    public void setTargetMajor(String targetMajor) { this.targetMajor = targetMajor; }

    public String getTargetDegree() { return targetDegree; }
    public void setTargetDegree(String targetDegree) { this.targetDegree = targetDegree; }

    public double getCurrentCgpa() { return currentCgpa; }
    public void setCurrentCgpa(double currentCgpa) { this.currentCgpa = currentCgpa; }

    public double getIeltsScore() { return ieltsScore; }
    public void setIeltsScore(double ieltsScore) { this.ieltsScore = ieltsScore; }
}
