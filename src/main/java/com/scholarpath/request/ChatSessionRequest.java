package com.scholarpath.request;

import javax.validation.constraints.NotBlank;

public class ChatSessionRequest {

    @NotBlank(message = "studentId is required")
    private String studentId;

    public ChatSessionRequest() {
    }

    public void validate() {

    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
}
