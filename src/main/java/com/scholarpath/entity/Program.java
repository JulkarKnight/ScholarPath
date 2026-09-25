package com.scholarpath.entity;

public class Program {
    private String programId;
    private String universityId;
    private String name;
    private String degreeLevel;

    public Program() {
    }

    public Program(String programId, String universityId, String name, String degreeLevel) {
        this.programId = programId;
        this.universityId = universityId;
        this.name = name;
        this.degreeLevel = degreeLevel;
    }

    public String getProgramId() { return programId; }
    public void setProgramId(String programId) { this.programId = programId; }

    public String getUniversityId() { return universityId; }
    public void setUniversityId(String universityId) { this.universityId = universityId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDegreeLevel() { return degreeLevel; }
    public void setDegreeLevel(String degreeLevel) { this.degreeLevel = degreeLevel; }
}
