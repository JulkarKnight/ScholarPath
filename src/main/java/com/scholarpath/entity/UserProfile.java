package com.scholarpath.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_profiles")
public class UserProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String fullName;
    
    @Column(length = 1000)
    private String bio;
    
    private String profilePicUrl;
    
    private String targetCountry;
    private String targetDegree;
    private String currentDegree;
    
    private Double cgpa;
    private Double ieltsScore;
    private Double budget;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public String getProfilePicUrl() { return profilePicUrl; }
    public void setProfilePicUrl(String profilePicUrl) { this.profilePicUrl = profilePicUrl; }
    
    public String getTargetCountry() { return targetCountry; }
    public void setTargetCountry(String targetCountry) { this.targetCountry = targetCountry; }
    
    public String getTargetDegree() { return targetDegree; }
    public void setTargetDegree(String targetDegree) { this.targetDegree = targetDegree; }
    
    public String getCurrentDegree() { return currentDegree; }
    public void setCurrentDegree(String currentDegree) { this.currentDegree = currentDegree; }
    
    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }
    
    public Double getIeltsScore() { return ieltsScore; }
    public void setIeltsScore(Double ieltsScore) { this.ieltsScore = ieltsScore; }
    
    public Double getBudget() { return budget; }
    public void setBudget(Double budget) { this.budget = budget; }
}
