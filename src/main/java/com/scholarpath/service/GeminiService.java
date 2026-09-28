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

    @Value("#{'${gemini.api.keys}'.split(',')}")
    private List<String> apiKeys;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonNode generateContent(String prompt, Map<String, Object> jsonSchema) throws Exception {
        Map<String, Object> requestBody = new HashMap<>();
        
        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);
        Map<String, Object> content = new HashMap<>();
        content.put("parts", Collections.singletonList(part));
        requestBody.put("contents", Collections.singletonList(content));

        Map<String, Object> generationConfig = new HashMap<>();
        if (jsonSchema != null) {
            generationConfig.put("response_mime_type", "application/json");
            generationConfig.put("response_schema", jsonSchema);
        }
        requestBody.put("generationConfig", generationConfig);

        return executeWithFallback(requestBody, jsonSchema != null);
    }

    public JsonNode generateChat(List<Map<String, String>> chatHistory) throws Exception {
        StringBuilder combinedPrompt = new StringBuilder();
        for (Map<String, String> msg : chatHistory) {
            String role = msg.get("role");
            String text = msg.get("text");
            combinedPrompt.append(role.toUpperCase()).append(": ").append(text).append("\n\n");
        }
        combinedPrompt.append("MODEL: ");

        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> part = new HashMap<>();
        part.put("text", combinedPrompt.toString());
        Map<String, Object> content = new HashMap<>();
        content.put("parts", Collections.singletonList(part));
        requestBody.put("contents", Collections.singletonList(content));

        return executeWithFallback(requestBody, false);
    }

    private JsonNode executeWithFallback(Map<String, Object> requestBody, boolean parseAsJson) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("User-Agent", "scholarpath-spring-boot");
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Dynamic Model Fallback Cascade: Try best models first, then fallbacks
        List<String> models = Arrays.asList(
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-1.5-flash-8b",
            "gemini-1.0-pro",
            "gemini-flash-latest"
        );
        Exception lastException = null;

        for (String currentKey : apiKeys) {
            String cleanKey = currentKey.trim();
            if (cleanKey.isEmpty() || "default_missing_key".equals(cleanKey)) {
                continue; // Skip invalid or missing keys
            }
            
            String safeKeyPrint = cleanKey.length() > 5 ? cleanKey.substring(0, 5) + "..." : "key";

            for (String modelName : models) {
                // Replace the model name in the URL dynamically
                String url = apiUrl.replaceAll("models/[^:]+:", "models/" + modelName + ":") + "?key=" + cleanKey;
                
                try {
                    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
                    
                    if (response.getStatusCode().is2xxSuccessful()) {
                        JsonNode root = objectMapper.readTree(response.getBody());
                        JsonNode candidates = root.path("candidates");
                        if (candidates.isArray() && candidates.size() > 0) {
                            String responseText = candidates.get(0)
                                    .path("content")
                                    .path("parts")
                                    .get(0)
                                    .path("text")
                                    .asText();
                            
                            if (parseAsJson) {
                                return objectMapper.readTree(responseText);
                            } else {
                                return objectMapper.createObjectNode().put("text", responseText);
                            }
                        }
                    }
                } catch (HttpStatusCodeException e) {
                    // Catch High Demand (503), Rate Limit (429), Not Found (404 for deprecated models) and gracefully try next
                    if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS || 
                        e.getStatusCode() == HttpStatus.SERVICE_UNAVAILABLE || 
                        e.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR ||
                        e.getStatusCode() == HttpStatus.BAD_GATEWAY ||
                        e.getStatusCode() == HttpStatus.NOT_FOUND ||
                        e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                        System.err.println("[FALLBACK CASCADE] Model " + modelName + " (Key " + safeKeyPrint + ") failed with " + e.getStatusCode() + ". Trying next...");
                        lastException = e;
                        continue; 
                    } else {
                        throw e;
                    }
                } catch (Exception e) {
                    System.err.println("[FALLBACK CASCADE] Error with model " + modelName + " (Key " + safeKeyPrint + "): " + e.getMessage() + ". Trying next...");
                    lastException = e;
                }
            }
        }
        
        throw new RuntimeException("All fallback models AND all API keys failed due to high demand or errors. Last error: " + 
                (lastException != null ? lastException.getMessage() : "Unknown"), lastException);
    }
}
