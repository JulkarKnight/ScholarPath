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

    @Autowired
    private com.scholarpath.repository.UserProfileRepository userProfileRepository;

    private static final java.io.File USERS_FILE = new java.io.File("users-store.properties");

    @javax.annotation.PostConstruct
    public void initUsers() {
        if (USERS_FILE.exists()) {
            java.util.Properties props = new java.util.Properties();
            try (java.io.FileInputStream fis = new java.io.FileInputStream(USERS_FILE)) {
                props.load(fis);
                for (String key : props.stringPropertyNames()) {
                    if (!key.contains(".") && !userDetailsManager.userExists(key)) {
                        String encodedPass = props.getProperty(key);
                        userDetailsManager.createUser(User.withUsername(key)
                                .password(encodedPass)
                                .authorities("USER")
                                .build());
                        com.scholarpath.entity.UserProfile profile = new com.scholarpath.entity.UserProfile();
                        String email = props.getProperty(key + ".email", "");
                        if (email.isEmpty()) email = key + "@local.dev";
                        profile.setEmail(email);
                        profile.setFullName(key);
                        profile.setTargetCountry(props.getProperty(key + ".country", "Canada"));
                        if (!userProfileRepository.findByEmail(email).isPresent()) {
                            userProfileRepository.save(profile);
                        }
                    }
                }
            } catch (Exception ignored) {
            }
        }
    }

    private synchronized void persistUser(String username, String encodedPass, String email, String targetCountry) {
        java.util.Properties props = new java.util.Properties();
        if (USERS_FILE.exists()) {
            try (java.io.FileInputStream fis = new java.io.FileInputStream(USERS_FILE)) {
                props.load(fis);
            } catch (Exception ignored) {
            }
        }
        props.setProperty(username, encodedPass);
        if (email != null) props.setProperty(username + ".email", email);
        if (targetCountry != null) props.setProperty(username + ".country", targetCountry);
        try (java.io.FileOutputStream fos = new java.io.FileOutputStream(USERS_FILE)) {
            props.store(fos, "ScholarPath Persistent Users");
        } catch (Exception ignored) {
        }
    }

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

        String encodedPass = passwordEncoder.encode(password);
        userDetailsManager.createUser(User.withUsername(username)
                .password(encodedPass)
                .authorities("USER")
                .build());
        persistUser(username, encodedPass, email, targetCountry);

        // Initialize UserProfile
        com.scholarpath.entity.UserProfile profile = new com.scholarpath.entity.UserProfile();
        String finalEmail = (email != null && !email.isEmpty()) ? email : username + "@local.dev";
        profile.setEmail(finalEmail);
        profile.setFullName(username);
        profile.setTargetCountry(targetCountry);
        if (!userProfileRepository.findByEmail(finalEmail).isPresent()) {
            userProfileRepository.save(profile);
        }

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
