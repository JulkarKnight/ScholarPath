package com.scholarpath.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GeminiService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    private final String apiUrl = "https://openrouter.ai/api/v1/chat/completions";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonNode generateContent(String prompt, Map<String, Object> jsonSchema) throws Exception {
        Map<String, Object> requestBody = new HashMap<>();
        
        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> userMsg = new HashMap<>();
        userMsg.put("role", "user");
        
        if (jsonSchema != null) {
            String schemaStr = objectMapper.writeValueAsString(jsonSchema);
            userMsg.put("content", prompt + "\n\nCRITICAL: You MUST respond with ONLY valid JSON matching this schema. NO markdown formatting, NO backticks. Schema:\n" + schemaStr);
            
            // OpenRouter JSON mode (supported by some models, fallback models will just follow prompt instructions)
            Map<String, Object> responseFormat = new HashMap<>();
            responseFormat.put("type", "json_object");
            requestBody.put("response_format", responseFormat);
        } else {
            userMsg.put("content", prompt);
        }
        
        messages.add(userMsg);
        requestBody.put("messages", messages);

        return executeWithFallback(requestBody, jsonSchema != null);
    }

    public JsonNode generateChat(List<Map<String, String>> chatHistory) throws Exception {
        Map<String, Object> requestBody = new HashMap<>();

        List<Map<String, String>> messages = new ArrayList<>();
        for (Map<String, String> msg : chatHistory) {
            Map<String, String> formattedMsg = new HashMap<>();
            String role = "model".equalsIgnoreCase(msg.get("role")) ? "assistant" : "user";
            formattedMsg.put("role", role);
            formattedMsg.put("content", msg.get("text"));
            messages.add(formattedMsg);
        }
        
        requestBody.put("messages", messages);
        return executeWithFallback(requestBody, false);
    }

    private JsonNode executeWithFallback(Map<String, Object> requestBody, boolean parseAsJson) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey.trim());
        headers.set("HTTP-Referer", "http://localhost:8080"); 
        headers.set("X-Title", "ScholarPath AI");

        // openrouter/free auto-picks any working free model — confirmed working
        List<String> fallbackModels = Arrays.asList(
            "openrouter/free",
            "qwen/qwen3.8-27b:free",
            "google/gemma-4-31b-it:free",
            "nvidia/nemotron-3-super-120b-a12b:free"
        );
        Exception lastException = null;

        for (String modelName : fallbackModels) {
            requestBody.put("model", modelName);
            String jsonBody = objectMapper.writeValueAsString(requestBody);
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
            try {
                ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);
                
                if (response.getStatusCode().is2xxSuccessful()) {
                    JsonNode root = objectMapper.readTree(response.getBody());
                    JsonNode choices = root.path("choices");
                    if (choices.isArray() && choices.size() > 0) {
                        String responseText = choices.get(0).path("message").path("content").asText();
                        
                        if (parseAsJson) {
                            // Clean up markdown block if present
                            responseText = responseText.trim();
                            if (responseText.startsWith("```json")) {
                                responseText = responseText.substring(7);
                            }
                            if (responseText.startsWith("```")) {
                                responseText = responseText.substring(3);
                            }
                            if (responseText.endsWith("```")) {
                                responseText = responseText.substring(0, responseText.length() - 3);
                            }
                            return objectMapper.readTree(responseText.trim());
                        } else {
                            return objectMapper.createObjectNode().put("text", responseText);
                        }
                    }
                }
            } catch (HttpStatusCodeException e) {
                System.err.println("[OPENROUTER FALLBACK] Model " + modelName + " failed with " + e.getStatusCode() + " - " + e.getResponseBodyAsString() + ". Trying next...");
                lastException = e;
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                    Thread.sleep(1500);
                }
            } catch (Exception e) {
                System.err.println("[OPENROUTER FALLBACK] Error with model " + modelName + ": " + e.getMessage() + ". Trying next...");
                lastException = e;
            }
        }
        
        throw new RuntimeException("All OpenRouter models failed. Last error: " + 
                (lastException != null ? lastException.getMessage() : "Unknown"), lastException);
    }
}
