package com.scholarpath.entity;

public class VisaQuestion {
    private String questionId;
    private String country;
    private String category;
    private String questionText;
    private String sampleAnswer;

    public VisaQuestion() {
    }

    public VisaQuestion(String questionId, String country, String category,
                        String questionText, String sampleAnswer) {
        this.questionId = questionId;
        this.country = country;
        this.category = category;
        this.questionText = questionText;
        this.sampleAnswer = sampleAnswer;
    }

    public String getQuestionId() { return questionId; }
    public void setQuestionId(String questionId) { this.questionId = questionId; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getSampleAnswer() { return sampleAnswer; }
    public void setSampleAnswer(String sampleAnswer) { this.sampleAnswer = sampleAnswer; }
}
