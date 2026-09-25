package com.scholarpath.request;

import javax.validation.constraints.NotBlank;

public class ProgramRequest {

    @NotBlank(message = "universityId is required")
    private String universityId;

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "degreeLevel is required")
    private String degreeLevel;

    public ProgramRequest() {
    }

    public void validate() {

    }

    public String getUniversityId() { return universityId; }
    public void setUniversityId(String universityId) { this.universityId = universityId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDegreeLevel() { return degreeLevel; }
    public void setDegreeLevel(String degreeLevel) { this.degreeLevel = degreeLevel; }
}
