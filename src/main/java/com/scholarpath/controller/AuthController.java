package com.scholarpath.controller;

import com.scholarpath.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private InMemoryUserDetailsManager userDetailsManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        String email = request.get("email");
        String targetCountry = request.get("targetCountry");

        if (userDetailsManager.userExists(username)) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "User already exists");
            return ResponseEntity.badRequest().body(error);
        }

        userDetailsManager.createUser(User.withUsername(username)
                .password(passwordEncoder.encode(password))
                .authorities("USER")
                .build());

        // Initialize UserProfile
        com.scholarpath.entity.UserProfile profile = new com.scholarpath.entity.UserProfile();
        profile.setEmail(email);
        profile.setTargetCountry(targetCountry);
        com.scholarpath.controller.UserProfileController.PROFILES.put(username, profile);

        // Generate JWT token automatically on registration
        final UserDetails userDetails = userDetailsManager.loadUserByUsername(username);
        final String jwt = jwtUtil.generateToken(userDetails);

        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.get("username"), request.get("password"))
            );
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Incorrect username or password");
            return ResponseEntity.badRequest().body(error);
        }

        final UserDetails userDetails = userDetailsManager.loadUserByUsername(request.get("username"));
        final String jwt = jwtUtil.generateToken(userDetails);

        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        return ResponseEntity.ok(response);
    }
}
