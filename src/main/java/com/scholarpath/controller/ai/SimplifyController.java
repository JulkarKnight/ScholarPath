package com.scholarpath.controller.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.scholarpath.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
public class SimplifyController {

    private final GeminiService geminiService;

    public SimplifyController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/simplify")
    public ResponseEntity<?> simplifyWebsite(@RequestBody Map<String, String> request) {
        try {
            String rawText = request.get("rawText");
            String targetCountry = request.getOrDefault("targetCountry", "General");

            if (rawText == null || rawText.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "rawText is required"));
            }


            String text = rawText.length() > 4000 ? rawText.substring(0, 4000) : rawText;

            String prompt = "You are an expert AI Study Abroad Mentor for Bangladeshi students.\n" +
                    "A student pasted this official university or embassy text/requirements (" + targetCountry + "):\n\n" +
                    "---\n" + text + "\n---\n\n" +
                    "Task: Translate and SIMPLIFY this text for a Bangladeshi applicant. Do NOT just translate line by line. Breakdown into simple, highly actionable conversational Bangla with bullet points.\n\n" +
                    "Return JSON with:\n" +
                    "1. simplifiedBn: clear summary in Bangla explaining what this page actually means.\n" +
                    "2. requiredDocuments: array of exact documents required (e.g., [\"SSC/HSC Transcript\", \"SOP\", \"IELTS 6.5\"]).\n" +
                    "3. importantDeadlines: array of key dates/deadlines mentioned or implied.\n" +
                    "4. actionTipsBn: array of 3 practical advice tips in Bangla for Bangladeshi students.";


            Map<String, Object> schema = new HashMap<>();
            schema.put("type", "OBJECT");
            
            Map<String, Object> properties = new HashMap<>();
            
            properties.put("simplifiedBn", Collections.singletonMap("type", "STRING"));
            
            Map<String, Object> arrayType = new HashMap<>();
            arrayType.put("type", "ARRAY");
            arrayType.put("items", Collections.singletonMap("type", "STRING"));
            
            properties.put("requiredDocuments", arrayType);
            properties.put("importantDeadlines", arrayType);
            properties.put("actionTipsBn", arrayType);
            
            schema.put("properties", properties);
            schema.put("required", Arrays.asList("simplifiedBn", "requiredDocuments", "importantDeadlines", "actionTipsBn"));

            JsonNode result = geminiService.generateContent(prompt, schema);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
