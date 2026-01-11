# CVNexus – Technology Stack

This document outlines the complete technology stack used to build **CVNexus**, an intelligent ATS-optimized resume builder with AI-assisted content improvement, ATS scoring, automated error detection, and export functionality.

The stack prioritizes:
- Reliability over hype
- Deterministic logic where required
- AI used only where it adds real value
- ATS safety and explainability

---

## 1. Frontend

### Core
- **React.js**
  - Component-based UI architecture
  - Resume builder, dashboard, and analysis views

- **Tailwind CSS**
  - Utility-first styling
  - Consistent, responsive UI across devices

- **shadcn/ui**
  - Accessible, prebuilt UI components
  - Forms, modals, buttons, dialogs

### Animations & Visual Effects
- **Framer Motion**
  - Page transitions and subtle UI animations
  - Used sparingly to avoid UX and performance issues

- **motion.dev**
  - Micro-interactions and motion primitives
  - Limited to non-critical UI elements

- **Three.js**
  - Used only for optional landing page visual effects
  - Not used inside resume builder or ATS-related flows

---

## 2. Backend

### Server
- **Node.js**
  - Runtime for backend services

- **Express.js**
  - REST API layer
  - Handles resume CRUD, ATS checks, AI requests, and exports

### Database
- **MongoDB**
  - Stores structured resume data (JSON-based schema)
  - Stores user resumes, feedback reports, and metadata

- **Mongoose**
  - Schema definition and validation
  - Enforces resume structure consistency

---

## 3. Authentication & User Management

- **Clerk**
  - Secure authentication (login, signup, sessions)
  - User identity and access control
  - Reduces security implementation overhead

---

## 4. Resume Data & Validation

- **Zod** (or Joi)
  - Runtime validation of resume JSON
  - Ensures required sections are present
  - Prevents malformed or incomplete resume data

---

## 5. AI & NLP (API-Based, No ML Training)

### AI Content Generation & Feedback
- **OpenAI API (ChatGPT)**
  - Generate resume sections from prompts
  - Improve user-written content
  - Provide qualitative feedback and suggestions
  - Used with strict prompting to prevent hallucination

*(Gemini API can be used as an alternative provider)*

### Grammar & Language Analysis
- **LanguageTool API** or **OpenAI**
  - Grammar and spelling correction
  - Tense and sentence quality checks

### Lightweight NLP
- **natural (Node.js NLP library)**
  - Keyword extraction
  - Verb analysis
  - Duplicate phrase detection
  - Passive voice heuristics

---

## 6. ATS Checker & Rule Engine

### Deterministic ATS Rules (No AI)
- Custom rule-based engine written in **plain JavaScript**
- Checks include:
  - Standard section headings
  - Bullet length and structure
  - Formatting red flags (tables, columns, icons)
  - Section ordering
  - Skill placement and density

### Job Description Matching
- Keyword comparison between resume and job description
- Highlights missing, weak, or overused keywords
- Generates explainable ATS compatibility score

---

## 7. Automated Error Detection

### Rule-Based Detection
- Empty or missing sections
- Duplicate bullet points
- Weak action verbs
- Inconsistent dates
- Repeated skills

### AI-Assisted Detection
- Grammar issues
- Passive voice
- Buzzword stuffing
- Poorly written summaries

Errors are grouped into:
- Critical Issues
- Improvements Suggested
- Best Practices Followed

---

## 8. Resume Export

### PDF Export
- **Puppeteer**
  - Server-side HTML → PDF rendering
  - Pixel-perfect layout
  - ATS-safe formatting

### DOCX Export (Editable)
- **docxtemplater**
- **pizzip**
  - Resume data injected into Word templates
  - Produces fully editable `.docx` files
  - Compatible with Microsoft Word and Google Docs

---

## 9. Performance & Reliability (Optional / Phase 2)

- **BullMQ + Redis**
  - Background processing for:
    - AI analysis
    - ATS scoring
    - PDF/DOCX generation
  - Prevents blocking API requests

- **express-rate-limit**
  - API rate limiting
  - Protects AI endpoints from abuse

---

## Stack Philosophy

CVNexus is **not a pure AI system**.

- Structural correctness and ATS safety are enforced using deterministic logic
- AI is used only for content improvement and qualitative feedback
- All outputs are explainable, consistent, and user-controllable

This approach ensures reliability, trust, and real-world usability.

---
