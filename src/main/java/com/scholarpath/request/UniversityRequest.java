package com.scholarpath.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class UniversityRequest {

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "country is required")
    private String country;

    @NotBlank(message = "city is required")
    private String city;

    @NotNull(message = "worldRank is required")
    private Integer worldRank;

    @NotNull(message = "tuitionFeeUsd is required")
    private Double tuitionFeeUsd;

    @NotNull(message = "livingCostUsd is required")
    private Double livingCostUsd;

    @NotNull(message = "minCgpa is required")
    private Double minCgpa;

    public UniversityRequest() {
    }

    public void validate() {
        List<String> errors = new ArrayList<>();
        if (worldRank != null && worldRank < 1) {
            errors.add("worldRank must be a positive number");
        }
        if (tuitionFeeUsd != null && tuitionFeeUsd < 0) {
            errors.add("tuitionFeeUsd must be non-negative");
        }
        if (livingCostUsd != null && livingCostUsd < 0) {
            errors.add("livingCostUsd must be non-negative");
        }
        if (minCgpa != null && (minCgpa < 0 || minCgpa > 4)) {
            errors.add("minCgpa must be between 0 and 4");
        }
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException("Validation failed: " + String.join("; ", errors));
        }
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Integer getWorldRank() { return worldRank; }
    public void setWorldRank(Integer worldRank) { this.worldRank = worldRank; }

    public Double getTuitionFeeUsd() { return tuitionFeeUsd; }
    public void setTuitionFeeUsd(Double tuitionFeeUsd) { this.tuitionFeeUsd = tuitionFeeUsd; }

    public Double getLivingCostUsd() { return livingCostUsd; }
    public void setLivingCostUsd(Double livingCostUsd) { this.livingCostUsd = livingCostUsd; }

    public Double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }
}
