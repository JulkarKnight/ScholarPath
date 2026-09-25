package com.scholarpath.request;

import javax.validation.constraints.NotBlank;

public class VisaQuestionRequest {

    @NotBlank(message = "country is required")
    private String country;

    @NotBlank(message = "category is required")
    private String category;

    @NotBlank(message = "questionText is required")
    private String questionText;

    @NotBlank(message = "sampleAnswer is required")
    private String sampleAnswer;

    public VisaQuestionRequest() {
    }

    public void validate() {

    }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getSampleAnswer() { return sampleAnswer; }
    public void setSampleAnswer(String sampleAnswer) { this.sampleAnswer = sampleAnswer; }
}
