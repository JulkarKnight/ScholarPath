# ScholarPath AI - Entity Relationship Diagram

This ER Diagram is based on the data structures defined in `src/types.ts` of the ScholarPath AI project. It models the core entities needed to support the features like University search, Scholarship finder, Readiness Assessment, Visa preparation, and AI Chat.

```mermaid
erDiagram
    STUDENT {
        uuid student_id PK
        string email
        string target_country
        string target_major
        string target_degree
        float current_cgpa
        float ielts_score
    }

    UNIVERSITY {
        uuid university_id PK
        string name
        string country
        string city
        int world_rank
        float tuition_fee_usd
        float living_cost_usd
        float min_cgpa
    }

    PROGRAM {
        uuid program_id PK
        uuid university_id FK
        string name
        string degree_level
    }

    SCHOLARSHIP {
        uuid scholarship_id PK
        string title
        string country
        string coverage
        float min_cgpa
        date deadline
    }

    DOCUMENT_REQUIREMENT {
        uuid doc_req_id PK
        string title_en
        string category
        string required_for_country
    }

    STUDENT_DOCUMENT {
        uuid student_doc_id PK
        uuid student_id FK
        uuid doc_req_id FK
        boolean is_completed
        string file_url
    }

    READINESS_EVALUATION {
        uuid evaluation_id PK
        uuid student_id FK
        float overall_score
        float academic_score
        float language_score
        string readiness_level
    }

    VISA_QUESTION {
        uuid question_id PK
        string country
        string category
        string question_text
        string sample_answer
    }

    CHAT_SESSION {
        uuid session_id PK
        uuid student_id FK
        datetime started_at
    }

    CHAT_MESSAGE {
        uuid message_id PK
        uuid session_id FK
        string sender "Enum: user, assistant"
        string text
        datetime timestamp
    }

    STUDENT ||--o{ READINESS_EVALUATION : "undergoes"
    STUDENT ||--o{ STUDENT_DOCUMENT : "uploads"
    STUDENT ||--o{ CHAT_SESSION : "has"
    CHAT_SESSION ||--o{ CHAT_MESSAGE : "contains"
    DOCUMENT_REQUIREMENT ||--o{ STUDENT_DOCUMENT : "defines"
    UNIVERSITY ||--o{ PROGRAM : "offers"
    STUDENT }o--o{ UNIVERSITY : "shortlists"
    STUDENT }o--o{ SCHOLARSHIP : "applies_to"
    STUDENT }o--o{ VISA_QUESTION : "practices"
```

## Entity Breakdown (10 Entities)

1. **STUDENT**: Represents the user profile derived from the inputs required for `ApplicationReadinessRequest`.
2. **UNIVERSITY**: Represents the institutional data mapped directly from the `University` interface.
3. **PROGRAM**: Normalized from the `programs: string[]` array inside the University interface to properly represent a relational structure.
4. **SCHOLARSHIP**: Maps to the `Scholarship` interface, capturing funding opportunities.
5. **DOCUMENT_REQUIREMENT**: Maps to the `DocumentCheckitem` interface, representing the system's global document rules per country.
6. **STUDENT_DOCUMENT**: The junction entity linking a specific student to a requirement, tracking their `isCompleted` status.
7. **READINESS_EVALUATION**: Maps to the `ApplicationReadinessResponse` storing the computed scores (academic, language, sop, etc.) for a student.
8. **VISA_QUESTION**: Maps to the `VisaInterviewQuestion` interface, holding practice questions and tips.
9. **CHAT_SESSION**: Logical container for an AI chat conversation for a specific student.
10. **CHAT_MESSAGE**: Maps to the `ChatMessage` interface, tracking individual AI and user responses with timestamps.
