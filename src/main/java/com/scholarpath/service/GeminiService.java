package com.scholarpath.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonNode generateContent(String prompt, Map<String, Object> jsonSchema) throws Exception {
        if ("default_missing_key".equals(apiKey)) {
            throw new RuntimeException("GEMINI_API_KEY environment variable is not set.");
        }

        String url = apiUrl + "?key=" + apiKey;


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

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("User-Agent", "scholarpath-spring-boot");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

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
                

                if (jsonSchema != null) {
                    return objectMapper.readTree(responseText);
                } else {
                    return objectMapper.createObjectNode().put("text", responseText);
                }
            }
        }
        
        throw new RuntimeException("Failed to generate content from Gemini API: " + response.getBody());
    }

    public JsonNode generateChat(List<Map<String, String>> chatHistory) throws Exception {
        if ("default_missing_key".equals(apiKey)) {
            throw new RuntimeException("GEMINI_API_KEY environment variable is not set.");
        }

        String url = apiUrl + "?key=" + apiKey;

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

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("User-Agent", "scholarpath-spring-boot");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
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
                return objectMapper.createObjectNode().put("text", responseText);
            }
        }
        throw new RuntimeException("Failed to generate chat from Gemini API");
    }
}
