package com.scholarpath.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your ScholarPath AI Login OTP");
        message.setText("Hello,\n\nYour One-Time Password (OTP) for login is: " + otp + "\n\nThis OTP is valid for a single use.\n\nBest,\nScholarPath AI Team");
        
        try {
            mailSender.send(message);
            System.out.println("OTP email sent to: " + to);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + to + ": " + e.getMessage());
        }
    }
}
