package com.scholarpath.controller.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.scholarpath.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
public class TimelineController {

    private final GeminiService geminiService;

    public TimelineController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/timeline")
    public ResponseEntity<?> generateTimeline(@RequestBody Map<String, Object> request) {
        try {
            String country = (String) request.getOrDefault("country", "Canada");
            String targetIntake = (String) request.getOrDefault("targetIntake", "Fall");
            String currentStatus = (String) request.getOrDefault("currentStatus", "In 4th year Bachelor / Planning");

            String prompt = "Create a step-by-step Study Abroad Roadmap for a Bangladeshi student.\n" +
                    "Target Country: " + country + "\n" +
                    "Target Intake: " + targetIntake + "\n" +
                    "Current Student Status: " + currentStatus + "\n\n" +
                    "Provide 5 sequential phases covering IELTS, SOP/LOR collection, Application submission, Offer & Financial proof, Visa filing, and Pre-departure.";


            Map<String, Object> schema = new HashMap<>();
            schema.put("type", "ARRAY");
            
            Map<String, Object> itemProperties = new HashMap<>();
            itemProperties.put("phaseName", Collections.singletonMap("type", "STRING"));
            itemProperties.put("monthsRange", Collections.singletonMap("type", "STRING"));
            
            Map<String, Object> tasksArray = new HashMap<>();
            tasksArray.put("type", "ARRAY");
            tasksArray.put("items", Collections.singletonMap("type", "STRING"));
            itemProperties.put("tasksBn", tasksArray);
            
            itemProperties.put("statusNote", Collections.singletonMap("type", "STRING"));
            
            Map<String, Object> items = new HashMap<>();
            items.put("type", "OBJECT");
            items.put("properties", itemProperties);
            items.put("required", Arrays.asList("phaseName", "monthsRange", "tasksBn", "statusNote"));
            
            schema.put("items", items);

            JsonNode result = geminiService.generateContent(prompt, schema);
            return ResponseEntity.ok(Collections.singletonMap("timeline", result));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
