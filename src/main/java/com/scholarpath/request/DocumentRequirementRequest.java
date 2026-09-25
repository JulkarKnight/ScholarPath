package com.scholarpath.request;

import javax.validation.constraints.NotBlank;

public class DocumentRequirementRequest {

    @NotBlank(message = "titleEn is required")
    private String titleEn;

    @NotBlank(message = "category is required")
    private String category;

    @NotBlank(message = "requiredForCountry is required")
    private String requiredForCountry;

    public DocumentRequirementRequest() {
    }

    public void validate() {

    }

    public String getTitleEn() { return titleEn; }
    public void setTitleEn(String titleEn) { this.titleEn = titleEn; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getRequiredForCountry() { return requiredForCountry; }
    public void setRequiredForCountry(String requiredForCountry) { this.requiredForCountry = requiredForCountry; }
}
