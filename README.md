# ScholarPath AI - Backend API

ScholarPath AI is a Study Abroad Mentor system developed for Bangladeshi students. 
This repository contains the REST API backend built with Java Spring Boot.

## Project Architecture
- **REST API Structure:** The project is a backend service focusing on object-oriented principles and RESTful design.
- **Controllers:** API controllers (ReadinessAiController, VisaPracticeController, ChatAiController, etc.) are implemented with structured Request Objects (@RequestBody).
- **External API Integration:** Features integration with Google's Gemini API via the internal GeminiService class.

## Run Locally

**Prerequisites:** 
- Java 8 (JDK 1.8)
- Gemini API Key

### Setup Instructions

1. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

2. **Start the Server:**
   Start the server using the provided batch script:
   ```powershell
   .\start.bat
   ```

3. **Test the API Endpoints (Swagger UI):**
   The backend will start on port 8080. You can test the API endpoints using the built-in Swagger UI.
   
   Navigate to:
   http://localhost:8080/swagger-ui/index.html
   
   Alternatively, you can send JSON POST/GET requests to endpoints such as:
   - `http://localhost:8080/api/universities`
   - `http://localhost:8080/api/ai/readiness`
   - `http://localhost:8080/api/ai/chat`
