package com.scholarpath.request;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ChatMessageRequest {

    @NotBlank(message = "sessionId is required")
    private String sessionId;

    @NotBlank(message = "sender is required")
    private String sender;

    @NotBlank(message = "text is required")
    private String text;

    public ChatMessageRequest() {
    }

    public void validate() {
        List<String> errors = new ArrayList<>();
        if (sender != null && !Arrays.asList("user", "assistant").contains(sender)) {
            errors.add("sender must be either 'user' or 'assistant'");
        }
        if (!errors.isEmpty()) {
            throw new IllegalArgumentException("Validation failed: " + String.join("; ", errors));
        }
    }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}
