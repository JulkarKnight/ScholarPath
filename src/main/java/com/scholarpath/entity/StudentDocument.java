package com.scholarpath.entity;

public class StudentDocument {
    private String studentDocId;
    private String studentId;
    private String docReqId;
    private boolean isCompleted;
    private String fileUrl;

    public StudentDocument() {
    }

    public StudentDocument(String studentDocId, String studentId, String docReqId,
                           boolean isCompleted, String fileUrl) {
        this.studentDocId = studentDocId;
        this.studentId = studentId;
        this.docReqId = docReqId;
        this.isCompleted = isCompleted;
        this.fileUrl = fileUrl;
    }

    public String getStudentDocId() { return studentDocId; }
    public void setStudentDocId(String studentDocId) { this.studentDocId = studentDocId; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getDocReqId() { return docReqId; }
    public void setDocReqId(String docReqId) { this.docReqId = docReqId; }

    public boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(boolean isCompleted) { this.isCompleted = isCompleted; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
}
