package com.scholarpath.controller;

import com.scholarpath.entity.UserProfile;
import com.scholarpath.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {
    
    @Autowired
    private UserProfileRepository userProfileRepository;

    @GetMapping
    public UserProfile getProfile(Principal principal) {
        if (principal == null) return new UserProfile();
        return userProfileRepository.findByEmail(principal.getName())
                .orElse(new UserProfile());
    }

    @PostMapping
    public UserProfile updateProfile(Principal principal, @RequestBody UserProfile profile) {
        if (principal == null) throw new RuntimeException("Unauthorized");
        
        UserProfile existing = userProfileRepository.findByEmail(principal.getName()).orElse(new UserProfile());
        
        existing.setEmail(principal.getName());
        if (profile.getFullName() != null) existing.setFullName(profile.getFullName());
        if (profile.getBio() != null) existing.setBio(profile.getBio());
        if (profile.getProfilePicUrl() != null) existing.setProfilePicUrl(profile.getProfilePicUrl());
        if (profile.getTargetCountry() != null) existing.setTargetCountry(profile.getTargetCountry());
        if (profile.getTargetDegree() != null) existing.setTargetDegree(profile.getTargetDegree());
        if (profile.getCurrentDegree() != null) existing.setCurrentDegree(profile.getCurrentDegree());
        if (profile.getCgpa() != null) existing.setCgpa(profile.getCgpa());
        if (profile.getIeltsScore() != null) existing.setIeltsScore(profile.getIeltsScore());
        if (profile.getBudget() != null) existing.setBudget(profile.getBudget());
        
        return userProfileRepository.save(existing);
    }
}
