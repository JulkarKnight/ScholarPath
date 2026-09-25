package com.scholarpath.entity;

public class University {
    private String universityId;
    private String name;
    private String country;
    private String city;
    private int worldRank;
    private double tuitionFeeUsd;
    private double livingCostUsd;
    private double minCgpa;

    public University() {
    }

    public University(String universityId, String name, String country, String city,
                      int worldRank, double tuitionFeeUsd, double livingCostUsd, double minCgpa) {
        this.universityId = universityId;
        this.name = name;
        this.country = country;
        this.city = city;
        this.worldRank = worldRank;
        this.tuitionFeeUsd = tuitionFeeUsd;
        this.livingCostUsd = livingCostUsd;
        this.minCgpa = minCgpa;
    }

    public String getUniversityId() { return universityId; }
    public void setUniversityId(String universityId) { this.universityId = universityId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public int getWorldRank() { return worldRank; }
    public void setWorldRank(int worldRank) { this.worldRank = worldRank; }

    public double getTuitionFeeUsd() { return tuitionFeeUsd; }
    public void setTuitionFeeUsd(double tuitionFeeUsd) { this.tuitionFeeUsd = tuitionFeeUsd; }

    public double getLivingCostUsd() { return livingCostUsd; }
    public void setLivingCostUsd(double livingCostUsd) { this.livingCostUsd = livingCostUsd; }

    public double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(double minCgpa) { this.minCgpa = minCgpa; }
}
