package com.scholarpath.controller.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.scholarpath.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
public class VisaPracticeController {

    private final GeminiService geminiService;
    private final String GROUNDED_POLICY_KNOWLEDGE_BASE = "Canada: GIC requires 20,635 CAD. Blocked account for Germany is 11,208 EUR. UK requires 28 days bank statement. USA requires I-20 and SEVIS fee. Always advise Bangladeshi students on IELTS minimums usually being 6.5.";

    public VisaPracticeController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/visa-practice")
    public ResponseEntity<?> evaluateVisa(@RequestBody Map<String, String> request) {
        try {
            String country = request.getOrDefault("country", "USA");
            String questionText = request.get("questionText");
            String studentAnswer = request.get("studentAnswer");

            if (studentAnswer == null || studentAnswer.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "studentAnswer is required"));
            }

            String prompt = "You are a former US / Canadian / European Visa Officer evaluating a Bangladeshi student's response in a mock student visa interview.\n\n" +
                    "Target Country: " + country + "\n" +
                    "Visa Question Asked: \"" + questionText + "\"\n" +
                    "Student's Answer: \"" + studentAnswer + "\"\n\n" +
                    "Official Grounding Policy Context:\n" + GROUNDED_POLICY_KNOWLEDGE_BASE + "\n\n" +
                    "Evaluate the student's answer on 4 parameters (score each 0-100):\n" +
                    "1. confidence (Clarity & assertiveness)\n" +
                    "2. grammar (English structure)\n" +
                    "3. relevance (Directness of answering the core question)\n" +
                    "4. authenticity (Genuineness vs memorized generic script)\n\n" +
                    "Provide feedbackBn, betterAnswerEn, and keyAdvicePointsBn.";


            Map<String, Object> schema = new HashMap<>();
            schema.put("type", "OBJECT");
            
            Map<String, Object> properties = new HashMap<>();
            

            Map<String, Object> scoresObject = new HashMap<>();
            scoresObject.put("type", "OBJECT");
            Map<String, Object> scoresProps = new HashMap<>();
            scoresProps.put("confidence", Collections.singletonMap("type", "INTEGER"));
            scoresProps.put("grammar", Collections.singletonMap("type", "INTEGER"));
            scoresProps.put("relevance", Collections.singletonMap("type", "INTEGER"));
            scoresProps.put("authenticity", Collections.singletonMap("type", "INTEGER"));
            scoresObject.put("properties", scoresProps);
            scoresObject.put("required", Arrays.asList("confidence", "grammar", "relevance", "authenticity"));
            
            properties.put("scores", scoresObject);
            properties.put("feedbackBn", Collections.singletonMap("type", "STRING"));
            properties.put("betterAnswerEn", Collections.singletonMap("type", "STRING"));
            
            Map<String, Object> arrayType = new HashMap<>();
            arrayType.put("type", "ARRAY");
            arrayType.put("items", Collections.singletonMap("type", "STRING"));
            properties.put("keyAdvicePointsBn", arrayType);
            
            schema.put("properties", properties);
            schema.put("required", Arrays.asList("scores", "feedbackBn", "betterAnswerEn", "keyAdvicePointsBn"));

            JsonNode result = geminiService.generateContent(prompt, schema);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
