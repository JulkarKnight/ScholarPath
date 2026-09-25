package com.scholarpath.entity;

import java.util.Date;

public class ChatSession {
    private String sessionId;
    private String studentId;
    private Date startedAt;

    public ChatSession() {
    }

    public ChatSession(String sessionId, String studentId, Date startedAt) {
        this.sessionId = sessionId;
        this.studentId = studentId;
        this.startedAt = startedAt;
    }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public Date getStartedAt() { return startedAt; }
    public void setStartedAt(Date startedAt) { this.startedAt = startedAt; }
}
