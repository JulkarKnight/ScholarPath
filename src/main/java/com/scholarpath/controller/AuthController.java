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

    @Autowired
    private com.scholarpath.service.EmailService emailService;

    private static final java.io.File USERS_FILE = new java.io.File("users-store.properties");

    private final java.util.concurrent.ConcurrentHashMap<String, String> otpStorage = new java.util.concurrent.ConcurrentHashMap<>();

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
        String username = request.get("username");
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, request.get("password"))
            );
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Incorrect username or password");
            return ResponseEntity.badRequest().body(error);
        }

        // Generate OTP
        String otp = String.format("%06d", new java.util.Random().nextInt(999999));
        otpStorage.put(username, otp);
        
        System.out.println("\n==============================================");
        System.out.println("OTP for user " + username + " is: " + otp);
        System.out.println("==============================================\n");

        // Send OTP via Email
        String emailTo = null;
        java.util.Optional<com.scholarpath.entity.UserProfile> profileOpt = userProfileRepository.findByFullName(username);
        if (profileOpt.isPresent() && profileOpt.get().getEmail() != null && !profileOpt.get().getEmail().endsWith("@local.dev")) {
            emailTo = profileOpt.get().getEmail();
        } else {
            java.util.Properties props = new java.util.Properties();
            if (USERS_FILE.exists()) {
                try (java.io.FileInputStream fis = new java.io.FileInputStream(USERS_FILE)) {
                    props.load(fis);
                    emailTo = props.getProperty(username + ".email");
                } catch (Exception ignored) {}
            }
        }
        
        if (emailTo != null && !emailTo.isEmpty() && !emailTo.endsWith("@local.dev")) {
            emailService.sendOtpEmail(emailTo, otp);
        } else {
            System.out.println("No valid email address found for user. OTP is only printed in the console.");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("otpRequired", true);
        response.put("message", "OTP has been sent to your registered email.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String otp = request.get("otp");
        
        if (username == null || otp == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Username and OTP are required");
            return ResponseEntity.badRequest().body(error);
        }
        
        String storedOtp = otpStorage.get(username);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(username); // Consume OTP
            final UserDetails userDetails = userDetailsManager.loadUserByUsername(username);
            final String jwt = jwtUtil.generateToken(userDetails);

            Map<String, String> response = new HashMap<>();
            response.put("token", jwt);
            return ResponseEntity.ok(response);
        }
        
        Map<String, String> error = new HashMap<>();
        error.put("error", "Invalid or expired OTP");
        return ResponseEntity.badRequest().body(error);
    }
}
