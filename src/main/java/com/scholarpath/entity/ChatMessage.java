package com.scholarpath.entity;

import java.util.Date;

public class ChatMessage {
    private String messageId;
    private String sessionId;
    private String sender;
    private String text;
    private Date timestamp;

    public ChatMessage() {
    }

    public ChatMessage(String messageId, String sessionId, String sender, String text, Date timestamp) {
        this.messageId = messageId;
        this.sessionId = sessionId;
        this.sender = sender;
        this.text = text;
        this.timestamp = timestamp;
    }

    public String getMessageId() { return messageId; }
    public void setMessageId(String messageId) { this.messageId = messageId; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public Date getTimestamp() { return timestamp; }
    public void setTimestamp(Date timestamp) { this.timestamp = timestamp; }
}
