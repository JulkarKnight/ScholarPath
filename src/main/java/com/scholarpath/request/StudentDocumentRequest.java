package com.scholarpath.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class StudentDocumentRequest {

    @NotBlank(message = "studentId is required")
    private String studentId;

    @NotBlank(message = "docReqId is required")
    private String docReqId;

    @NotNull(message = "isCompleted is required")
    private Boolean isCompleted;

    @NotBlank(message = "fileUrl is required")
    private String fileUrl;

    public StudentDocumentRequest() {
    }

    public void validate() {

    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getDocReqId() { return docReqId; }
    public void setDocReqId(String docReqId) { this.docReqId = docReqId; }

    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
}
