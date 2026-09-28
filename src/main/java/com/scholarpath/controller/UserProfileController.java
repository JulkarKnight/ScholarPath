package com.scholarpath.controller;

import com.scholarpath.entity.UserProfile;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {
    
    // In-memory store for user profiles since there's no DB configured yet
    public static final Map<String, UserProfile> PROFILES = new ConcurrentHashMap<>();

    @GetMapping
    public UserProfile getProfile(Principal principal) {
        if (principal == null) return new UserProfile();
        return PROFILES.getOrDefault(principal.getName(), new UserProfile());
    }

    @PostMapping
    public UserProfile updateProfile(Principal principal, @RequestBody UserProfile profile) {
        if (principal == null) throw new RuntimeException("Unauthorized");
        
        // Retain email and target country if they exist in the current profile and aren't provided in the update
        UserProfile existing = PROFILES.get(principal.getName());
        if (existing != null) {
            if (profile.getEmail() == null) profile.setEmail(existing.getEmail());
            if (profile.getTargetCountry() == null) profile.setTargetCountry(existing.getTargetCountry());
        }
        
        PROFILES.put(principal.getName(), profile);
        return profile;
    }
}
