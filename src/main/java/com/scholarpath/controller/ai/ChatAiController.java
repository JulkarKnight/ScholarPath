package com.scholarpath.controller.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.scholarpath.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
public class ChatAiController {

    private final GeminiService geminiService;


    private final String GROUNDED_POLICY_KNOWLEDGE_BASE = "Canada: GIC requires 20,635 CAD. Blocked account for Germany is 11,208 EUR. UK requires 28 days bank statement. USA requires I-20 and SEVIS fee. Always advise Bangladeshi students on IELTS minimums usually being 6.5.";

    public ChatAiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody Map<String, Object> request) {
        try {
            String message = (String) request.get("message");
            List<Map<String, String>> chatHistoryInput = (List<Map<String, String>>) request.get("chatHistory");

            if (message == null || message.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "message is required"));
            }

            String systemInstruction = "You are \"ScholarPath AI (স্কলারপাথ AI)\", an intelligent, highly knowledgeable Study Abroad Mentor specifically built for Bangladeshi students.\n" +
                    "Your goal is to guide students with accurate, grounded, and encouraging advice in conversational Bangla (or English when requested).\n\n" +
                    "Rules:\n" +
                    "1. Stay grounded in official rules (GIC, Blocked Accounts, Post-Graduation Work Permits, IELTS cutoffs, Visa rules).\n" +
                    "2. Use this Knowledge Base for reference:\n" +
                    GROUNDED_POLICY_KNOWLEDGE_BASE + "\n" +
                    "3. Always explain step-by-step in clear, easy-to-understand Bangla.\n" +
                    "4. If asked about specific universities, scholarships, or tuition fees, you can refer to top options in Canada, Germany, USA, UK, Australia, Finland, and Sweden.";

            List<Map<String, String>> chatHistory = new ArrayList<>();

            Map<String, String> sysMsg = new HashMap<>();
            sysMsg.put("role", "user");
            sysMsg.put("text", systemInstruction);
            chatHistory.add(sysMsg);
            

            Map<String, String> ackMsg = new HashMap<>();
            ackMsg.put("role", "model");
            ackMsg.put("text", "Understood.");
            chatHistory.add(ackMsg);


            if (chatHistoryInput != null) {
                for (Map<String, String> m : chatHistoryInput) {
                    Map<String, String> formattedMsg = new HashMap<>();
                    formattedMsg.put("role", "user".equals(m.get("sender")) ? "user" : "model");
                    formattedMsg.put("text", m.get("text"));
                    chatHistory.add(formattedMsg);
                }
            }


            Map<String, String> newMsg = new HashMap<>();
            newMsg.put("role", "user");
            newMsg.put("text", message);
            chatHistory.add(newMsg);

            JsonNode result = geminiService.generateChat(chatHistory);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
