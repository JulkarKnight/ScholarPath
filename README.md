# ScholarPath AI

ScholarPath AI is an intelligent, full-stack Study Abroad Mentor platform designed to guide students through the complex journey of higher education abroad. The system provides AI-driven personalized insights, interactive tools, and comprehensive resources to simplify university applications, document preparation, and visa interviews.

## Key Features

The platform includes a modern, premium frontend UI and powerful AI integrations across multiple core features:

1. **AI Chat Mentor**: Ask any study abroad question and receive customized guidance.
2. **University Explorer**: Filter and search through a curated database of top universities in target countries.
3. **Scholarship Finder**: Discover funding opportunities and financial aids tailored to international students.
4. **Smart Intake Roadmap**: Generate personalized, month-by-month timelines for your target intake.
5. **Document Readiness Checklist**: Track required documents and avoid common application pitfalls.
6. **Website Simplifier**: Paste complex university guidelines or visa instructions, and allow the AI to break it down into simple bullet points.
7. **Document Studio & AI Readiness Audit**: Upload transcripts, SOPs, CVs, and IELTS scorecards for AI verification. Obtain a readiness score, detailed feedback, and generate printable PDFs.
8. **Cost & Funding Calculator**: Estimate your net financial gap for visa requirements based on tuition, living costs, and funding sources.
9. **Interactive AI Visa Officer Simulator**: Practice mock embassy interviews using voice recording or typing. Receive instant confidence, grammar, and relevance scores.

## Technology Stack

- **Backend:** Java Spring Boot (Maven)
- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Lucide React Icons
- **AI Integration:** Google Gemini API
- **Build Integration:** `frontend-maven-plugin` (Seamlessly builds the React frontend and serves it via Spring Boot static resources)

## Run Locally

**Prerequisites:**
- Java 8 (JDK 1.8) or higher
- Gemini API Key

*(Note: You **do NOT** need to install Node.js, NPM, or Maven. The project uses the Maven Wrapper (`mvnw`) and `frontend-maven-plugin` which will automatically download and configure Node.js and dependencies locally just for this project!)*

### Setup Instructions

1. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

2. **Multiple API Key Injection (Optional Fallback System):**
   The application features a robust fallback mechanism that cascades through multiple AI models and API keys in the event of rate limits or quota exhaustion. 
   To leverage this, you can provide a comma-separated list of multiple API keys in your environment variables:
   ```env
   GEMINI_API_KEY=key_1_here,key_2_here,key_3_here
   ```
   Alternatively, you can modify `gemini.api.keys` directly in `src/main/resources/application.properties`. The `GeminiService` will seamlessly cycle through these keys to ensure uninterrupted AI services.

3. **Start the Server:**
   Start the monolithic server using the provided batch script. This script will automatically use the Maven Wrapper to build the frontend and run the Spring Boot backend:
   ```powershell
   .\start.bat
   ```
   *Note: On the first run, it may take a few minutes as the project securely downloads its own local copy of Node.js and builds the React frontend before starting the web server.*

4. **Access the Application:**
   Once the server starts, navigate to:
   - **Frontend UI:** `http://localhost:8080/`
   - **Swagger API Docs:** `http://localhost:8080/swagger-ui/index.html`

## Project Structure

- `src/main/java/`: Spring Boot backend controllers (`ReadinessAiController`, `VisaPracticeController`, etc.) and services.
- `frontend/`: Vite + React + TypeScript frontend codebase.
  - `frontend/src/components/`: Premium React components (`App.tsx`, `Header.tsx`, `ChatWidget.tsx`, and all core tabs).
  - `frontend/src/index.css`: Centralized design system with custom utility classes defining the premium aesthetic.
