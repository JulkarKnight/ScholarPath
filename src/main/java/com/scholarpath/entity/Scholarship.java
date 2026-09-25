package com.scholarpath.entity;

public class Scholarship {
    private String scholarshipId;
    private String title;
    private String country;
    private String coverage;
    private double minCgpa;
    private String deadline;

    public Scholarship() {
    }

    public Scholarship(String scholarshipId, String title, String country, String coverage,
                       double minCgpa, String deadline) {
        this.scholarshipId = scholarshipId;
        this.title = title;
        this.country = country;
        this.coverage = coverage;
        this.minCgpa = minCgpa;
        this.deadline = deadline;
    }

    public String getScholarshipId() { return scholarshipId; }
    public void setScholarshipId(String scholarshipId) { this.scholarshipId = scholarshipId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCoverage() { return coverage; }
    public void setCoverage(String coverage) { this.coverage = coverage; }

    public double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(double minCgpa) { this.minCgpa = minCgpa; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
}
