package com.scholarpath.entity;

import java.util.List;

public class University {
    private String id;
    private String name;
    private String country;
    private String city;
    private int worldRank;
    private List<String> programs;
    private double tuitionFeeUSDPerYear;
    private double livingCostUSDPerYear;
    private String currency;
    private String originalTuitionText;
    private double minCgpa;
    private double ieltsMinOverall;
    private Double ieltsMinBand;
    private Integer toeflMin;
    private boolean greRequired;
    private String applicationDeadlineFall;
    private String applicationDeadlineSpring;
    private int visaSuccessRatePercent;
    private List<String> scholarshipsAvailable;
    private int postGradWorkPermitYears;
    private String officialWebsite;
    private String descriptionBangla;
    private List<String> keyHighlights;

    public University() {
    }

    // Keep old constructor for backwards compatibility, setting defaults for new fields
    public University(String id, String name, String country, String city,
                      int worldRank, double tuitionFeeUsd, double livingCostUsd, double minCgpa) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city;
        this.worldRank = worldRank;
        this.programs = java.util.Arrays.asList("Computer Science", "Engineering", "Business");
        this.tuitionFeeUSDPerYear = tuitionFeeUsd;
        this.livingCostUSDPerYear = livingCostUsd;
        this.minCgpa = minCgpa;
        this.currency = "USD";
        this.originalTuitionText = "$" + tuitionFeeUsd + "/year";
        this.ieltsMinOverall = 6.5;
        this.ieltsMinBand = 6.0;
        this.toeflMin = 80;
        this.greRequired = false;
        this.applicationDeadlineFall = "January 15";
        this.applicationDeadlineSpring = "September 1";
        this.visaSuccessRatePercent = 85;
        this.scholarshipsAvailable = java.util.Arrays.asList("Entrance Scholarship", "Merit Award");
        this.postGradWorkPermitYears = 3;
        this.officialWebsite = "https://www." + name.toLowerCase().replace(" ", "").replace("(", "").replace(")", "") + ".edu";
        this.descriptionBangla = "উচ্চ শিক্ষার জন্য এটি একটি চমৎকার বিশ্ববিদ্যালয়। এখানে অনেক বাংলাদেশি শিক্ষার্থী পড়াশোনা করছে।";
        this.keyHighlights = java.util.Arrays.asList("Top Ranked", "Great Campus", "Research Opportunities");
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    // Legacy getUniversityId so old code compiles
    public String getUniversityId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public int getWorldRank() { return worldRank; }
    public void setWorldRank(int worldRank) { this.worldRank = worldRank; }

    public List<String> getPrograms() { return programs; }
    public void setPrograms(List<String> programs) { this.programs = programs; }

    public double getTuitionFeeUSDPerYear() { return tuitionFeeUSDPerYear; }
    public void setTuitionFeeUSDPerYear(double tuitionFeeUSDPerYear) { this.tuitionFeeUSDPerYear = tuitionFeeUSDPerYear; }
    
    // Legacy method
    public double getTuitionFeeUsd() { return tuitionFeeUSDPerYear; }

    public double getLivingCostUSDPerYear() { return livingCostUSDPerYear; }
    public void setLivingCostUSDPerYear(double livingCostUSDPerYear) { this.livingCostUSDPerYear = livingCostUSDPerYear; }
    
    // Legacy method
    public double getLivingCostUsd() { return livingCostUSDPerYear; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getOriginalTuitionText() { return originalTuitionText; }
    public void setOriginalTuitionText(String originalTuitionText) { this.originalTuitionText = originalTuitionText; }

    public double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(double minCgpa) { this.minCgpa = minCgpa; }

    public double getIeltsMinOverall() { return ieltsMinOverall; }
    public void setIeltsMinOverall(double ieltsMinOverall) { this.ieltsMinOverall = ieltsMinOverall; }

    public Double getIeltsMinBand() { return ieltsMinBand; }
    public void setIeltsMinBand(Double ieltsMinBand) { this.ieltsMinBand = ieltsMinBand; }

    public Integer getToeflMin() { return toeflMin; }
    public void setToeflMin(Integer toeflMin) { this.toeflMin = toeflMin; }

    public boolean isGreRequired() { return greRequired; }
    public void setGreRequired(boolean greRequired) { this.greRequired = greRequired; }

    public String getApplicationDeadlineFall() { return applicationDeadlineFall; }
    public void setApplicationDeadlineFall(String applicationDeadlineFall) { this.applicationDeadlineFall = applicationDeadlineFall; }

    public String getApplicationDeadlineSpring() { return applicationDeadlineSpring; }
    public void setApplicationDeadlineSpring(String applicationDeadlineSpring) { this.applicationDeadlineSpring = applicationDeadlineSpring; }

    public int getVisaSuccessRatePercent() { return visaSuccessRatePercent; }
    public void setVisaSuccessRatePercent(int visaSuccessRatePercent) { this.visaSuccessRatePercent = visaSuccessRatePercent; }

    public List<String> getScholarshipsAvailable() { return scholarshipsAvailable; }
    public void setScholarshipsAvailable(List<String> scholarshipsAvailable) { this.scholarshipsAvailable = scholarshipsAvailable; }

    public int getPostGradWorkPermitYears() { return postGradWorkPermitYears; }
    public void setPostGradWorkPermitYears(int postGradWorkPermitYears) { this.postGradWorkPermitYears = postGradWorkPermitYears; }

    public String getOfficialWebsite() { return officialWebsite; }
    public void setOfficialWebsite(String officialWebsite) { this.officialWebsite = officialWebsite; }

    public String getDescriptionBangla() { return descriptionBangla; }
    public void setDescriptionBangla(String descriptionBangla) { this.descriptionBangla = descriptionBangla; }

    public List<String> getKeyHighlights() { return keyHighlights; }
    public void setKeyHighlights(List<String> keyHighlights) { this.keyHighlights = keyHighlights; }
}
