package com.scholarpath.entity;

public class DocumentRequirement {
    private String docReqId;
    private String titleEn;
    private String category;
    private String requiredForCountry;

    public DocumentRequirement() {
    }

    public DocumentRequirement(String docReqId, String titleEn, String category, String requiredForCountry) {
        this.docReqId = docReqId;
        this.titleEn = titleEn;
        this.category = category;
        this.requiredForCountry = requiredForCountry;
    }

    public String getDocReqId() { return docReqId; }
    public void setDocReqId(String docReqId) { this.docReqId = docReqId; }

    public String getTitleEn() { return titleEn; }
    public void setTitleEn(String titleEn) { this.titleEn = titleEn; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getRequiredForCountry() { return requiredForCountry; }
    public void setRequiredForCountry(String requiredForCountry) { this.requiredForCountry = requiredForCountry; }
}
