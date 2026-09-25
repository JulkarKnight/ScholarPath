package com.scholarpath.controller.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.scholarpath.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
public class DocumentAuditController {

    private final GeminiService geminiService;
    private final String GROUNDED_POLICY_KNOWLEDGE_BASE = "Canada: GIC requires 20,635 CAD. Blocked account for Germany is 11,208 EUR. UK requires 28 days bank statement. USA requires I-20 and SEVIS fee. Always advise Bangladeshi students on IELTS minimums usually being 6.5.";

    public DocumentAuditController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/document-audit")
    public ResponseEntity<?> auditDocuments(@RequestBody Map<String, String> request) {
        try {
            String targetCountry = request.getOrDefault("targetCountry", "Canada");
            String targetDegree = request.getOrDefault("targetDegree", "Masters");
            String targetMajor = request.getOrDefault("targetMajor", "Computer Science");
            String transcriptInfo = request.getOrDefault("transcriptInfo", "");
            String cvInfo = request.getOrDefault("cvInfo", "");
            String sopInfo = request.getOrDefault("sopInfo", "");
            String languageInfo = request.getOrDefault("languageInfo", "");
            String lorInfo = request.getOrDefault("lorInfo", "");


            String prompt = "You are a Senior Admissions Committee Chair & Application Evaluator for universities in " + targetCountry + ".\n" +
                    "Analyze the provided information for a Bangladeshi applicant applying for " + targetDegree + " in " + targetMajor + ":\n\n" +
                    "1. ACADEMIC TRANSCRIPT INFO:\n\"" + (transcriptInfo.isEmpty() ? "Not provided" : transcriptInfo.substring(0, Math.min(transcriptInfo.length(), 2000))) + "\"\n\n" +
                    "2. CV / RESUME INFO:\n\"" + (cvInfo.isEmpty() ? "Not provided" : cvInfo.substring(0, Math.min(cvInfo.length(), 2000))) + "\"\n\n" +
                    "3. SOP INFO:\n\"" + (sopInfo.isEmpty() ? "Not provided" : sopInfo.substring(0, Math.min(sopInfo.length(), 2000))) + "\"\n\n" +
                    "4. LANGUAGE INFO:\n\"" + (languageInfo.isEmpty() ? "Not provided" : languageInfo.substring(0, Math.min(languageInfo.length(), 1000))) + "\"\n\n" +
                    "5. LOR INFO:\n\"" + (lorInfo.isEmpty() ? "Not provided" : lorInfo.substring(0, Math.min(lorInfo.length(), 1000))) + "\"\n\n" +
                    "Grounding Knowledge Reference:\n" + GROUNDED_POLICY_KNOWLEDGE_BASE + "\n\n" +
                    "Task: Evaluate the 5 document types (transcript, cv, sop, languageScore, recommendationLetters). " +
                    "Provide a score, status, strengths, weaknesses, actionableSuggestionsBn, and generatedFormattedDocText for each.";


            Map<String, Object> schema = new HashMap<>();
            schema.put("type", "OBJECT");
            
            Map<String, Object> properties = new HashMap<>();
            properties.put("overallDocumentReadinessScore", Collections.singletonMap("type", "INTEGER"));
            properties.put("summaryVerdictBn", Collections.singletonMap("type", "STRING"));


            Map<String, Object> fieldSchema = new HashMap<>();
            fieldSchema.put("type", "OBJECT");
            Map<String, Object> fProps = new HashMap<>();
            fProps.put("score", Collections.singletonMap("type", "INTEGER"));
            fProps.put("status", Collections.singletonMap("type", "STRING"));
            fProps.put("generatedFormattedDocText", Collections.singletonMap("type", "STRING"));
            
            Map<String, Object> stringArray = new HashMap<>();
            stringArray.put("type", "ARRAY");
            stringArray.put("items", Collections.singletonMap("type", "STRING"));
            fProps.put("strengths", stringArray);
            fProps.put("weaknesses", stringArray);
            fProps.put("actionableSuggestionsBn", stringArray);
            
            fieldSchema.put("properties", fProps);
            fieldSchema.put("required", Arrays.asList("score", "status", "strengths", "weaknesses", "actionableSuggestionsBn", "generatedFormattedDocText"));


            Map<String, Object> docAudits = new HashMap<>();
            docAudits.put("type", "OBJECT");
            Map<String, Object> dProps = new HashMap<>();
            dProps.put("transcript", fieldSchema);
            dProps.put("cv", fieldSchema);
            dProps.put("sop", fieldSchema);
            dProps.put("languageScore", fieldSchema);
            dProps.put("recommendationLetters", fieldSchema);
            docAudits.put("properties", dProps);
            docAudits.put("required", Arrays.asList("transcript", "cv", "sop", "languageScore", "recommendationLetters"));
            
            properties.put("documentAudits", docAudits);
            
            schema.put("properties", properties);
            schema.put("required", Arrays.asList("overallDocumentReadinessScore", "summaryVerdictBn", "documentAudits"));

            JsonNode result = geminiService.generateContent(prompt, schema);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
