package com.scholarpath.controller.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.scholarpath.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
public class ReadinessAiController {

    private final GeminiService geminiService;
    private final String GROUNDED_POLICY_KNOWLEDGE_BASE = "Canada: GIC requires 20,635 CAD. Blocked account for Germany is 11,208 EUR. UK requires 28 days bank statement. USA requires I-20 and SEVIS fee. Always advise Bangladeshi students on IELTS minimums usually being 6.5.";

    public ReadinessAiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/readiness")
    public ResponseEntity<?> evaluateReadiness(@RequestBody Map<String, Object> request) {
        try {
            Double cgpa = Double.valueOf(request.getOrDefault("cgpa", "0").toString());
            Double cgpaScale = Double.valueOf(request.getOrDefault("cgpaScale", "4.0").toString());
            String ieltsScore = request.getOrDefault("ieltsScore", "Not taken yet").toString();
            String targetCountry = (String) request.getOrDefault("targetCountry", "Canada");
            String targetMajor = (String) request.getOrDefault("targetMajor", "CS");
            String targetDegree = (String) request.getOrDefault("targetDegree", "Masters");
            String sopDraftText = (String) request.getOrDefault("sopDraftText", "");
            String cvSummaryText = (String) request.getOrDefault("cvSummaryText", "");
            Double bankSolvencyBDT = Double.valueOf(request.getOrDefault("bankSolvencyBDT", "0").toString());
            Boolean hasWorkExp = (Boolean) request.getOrDefault("hasWorkOrResearchExp", false);


            sopDraftText = sopDraftText.length() > 1000 ? sopDraftText.substring(0, 1000) : sopDraftText;
            cvSummaryText = cvSummaryText.length() > 1000 ? cvSummaryText.substring(0, 1000) : cvSummaryText;
            long usdEstimate = Math.round(bankSolvencyBDT / 120.0);

            String prompt = "You are a tough but supportive AI Admissions Board Advisor for international students from Bangladesh.\n" +
                    "Evaluate this student's profile and application readiness for studying abroad:\n\n" +
                    "Target Country: " + targetCountry + "\n" +
                    "Target Degree: " + targetDegree + " in " + targetMajor + "\n" +
                    "Academic CGPA: " + cgpa + " out of " + cgpaScale + "\n" +
                    "IELTS / Language Score: " + ieltsScore + "\n" +
                    "Work / Research Experience: " + (hasWorkExp ? "Yes" : "No / Minimal") + "\n" +
                    "SOP Excerpt: \"" + sopDraftText + "\"\n" +
                    "CV Highlights: \"" + cvSummaryText + "\"\n" +
                    "Bank Solvency Balance: " + bankSolvencyBDT + " BDT (~" + usdEstimate + " USD)\n\n" +
                    "Grounding Knowledge Reference for " + targetCountry + ":\n" +
                    GROUNDED_POLICY_KNOWLEDGE_BASE + "\n\n" +
                    "Task: Calculate a realistic overall Application Readiness Score percentage (0 to 100%).\n" +
                    "Grade category scores (0 to 100): academicMatch, languageProficiency, sopQuality, financialViability.\n\n" +
                    "Provide strengths, criticalGaps, recommendedNextStepsBn, and mentorSummaryBn.";


            Map<String, Object> schema = new HashMap<>();
            schema.put("type", "OBJECT");
            
            Map<String, Object> properties = new HashMap<>();
            properties.put("overallScorePercent", Collections.singletonMap("type", "INTEGER"));
            properties.put("readinessLevelText", Collections.singletonMap("type", "STRING"));
            properties.put("mentorSummaryBn", Collections.singletonMap("type", "STRING"));
            

            Map<String, Object> categoryScores = new HashMap<>();
            categoryScores.put("type", "OBJECT");
            Map<String, Object> catProps = new HashMap<>();
            catProps.put("academicMatch", Collections.singletonMap("type", "INTEGER"));
            catProps.put("languageProficiency", Collections.singletonMap("type", "INTEGER"));
            catProps.put("sopQuality", Collections.singletonMap("type", "INTEGER"));
            catProps.put("financialViability", Collections.singletonMap("type", "INTEGER"));
            categoryScores.put("properties", catProps);
            categoryScores.put("required", Arrays.asList("academicMatch", "languageProficiency", "sopQuality", "financialViability"));
            properties.put("categoryScores", categoryScores);
            

            Map<String, Object> stringArray = new HashMap<>();
            stringArray.put("type", "ARRAY");
            stringArray.put("items", Collections.singletonMap("type", "STRING"));
            properties.put("strengths", stringArray);
            properties.put("criticalGaps", stringArray);
            

            Map<String, Object> stepsArray = new HashMap<>();
            stepsArray.put("type", "ARRAY");
            Map<String, Object> stepItem = new HashMap<>();
            stepItem.put("type", "OBJECT");
            Map<String, Object> stepProps = new HashMap<>();
            stepProps.put("priority", Collections.singletonMap("type", "STRING"));
            stepProps.put("title", Collections.singletonMap("type", "STRING"));
            stepProps.put("description", Collections.singletonMap("type", "STRING"));
            stepItem.put("properties", stepProps);
            stepItem.put("required", Arrays.asList("priority", "title", "description"));
            stepsArray.put("items", stepItem);
            properties.put("recommendedNextStepsBn", stepsArray);
            
            schema.put("properties", properties);
            schema.put("required", Arrays.asList("overallScorePercent", "categoryScores", "readinessLevelText", "strengths", "criticalGaps", "recommendedNextStepsBn", "mentorSummaryBn"));

            JsonNode result = geminiService.generateContent(prompt, schema);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
