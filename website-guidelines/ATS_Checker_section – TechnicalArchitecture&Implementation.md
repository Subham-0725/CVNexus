# ATS Checker – Technical Architecture & Implementation

This document describes the complete technical design and implementation of the **ATS Checker** feature. It explains how the feature works across frontend, backend, database, parsing logic, rule-based evaluation, and edge-case handling, using the finalized MERN-based tech stack.

The ATS Checker is designed as a **rule-based, explainable system** that estimates how well a resume may perform in typical Applicant Tracking Systems, without claiming to simulate any real ATS software.

---

## 1. High-Level Architecture Overview

The ATS Checker is implemented as a layered system:

Frontend (React)<br>
↓<br>
Backend API (Node.js + Express)<br>
↓<br>
Parsing & Normalization Layer<br>
↓<br>
Rule-Based ATS Engine<br>
↓<br>
Scoring & Feedback Generator


The system supports **two resume input paths**:
1. Internal resumes (created using the Resume Builder)
2. External resumes (uploaded PDF/DOCX files)

---

## 2. Frontend Architecture

### 2.1 ATS Checker Page Layout

The ATS Checker is implemented as a dedicated page with three main UI blocks:

1. **Resume Input Section**
2. **Job Description Input Section**
3. **Results & Feedback Section**

---

### 2.2 Resume Input (Frontend)

The frontend provides two mutually exclusive options:

#### Option A: Use Resume from Application
- A dropdown or card list populated with the user’s saved resumes
- Resume ID is selected, not the file itself
- This option is clearly marked as “Recommended”

#### Option B: Upload Resume File
- File upload input
- Accepted formats:
  - PDF
  - DOCX
- Client-side validation rejects:
  - Unsupported formats
  - Empty files
  - Oversized files

The UI clearly labels uploaded resume analysis as **approximate**.

---

### 2.3 Job Description Input

- Large text area where users can paste a job description
- Optional input
- Helper text explains:
  - Better keyword matching
  - More accurate feedback

If empty:
- ATS Checker runs with general rules only

---

### 2.4 Triggering the ATS Check

When the user clicks **“Run ATS Check”**:
- Frontend validates required inputs
- Sends request to backend with:
  - Resume source (internal ID or uploaded file)
  - Job description text (if provided)

---

### 2.5 Results Rendering

Frontend displays:
- Estimated ATS compatibility score
- Section-wise breakdown
- Categorized feedback:
  - Critical Issues
  - Improvements Suggested
  - Strengths

Results are rendered from backend response only; no ATS logic exists on the frontend.

---

## 3. Backend Architecture

### 3.1 Core Responsibilities

The backend handles:
- Authentication (via Clerk)
- Resume retrieval or file processing
- Resume validation and detection
- ATS rule execution
- Scoring and feedback generation

---

## 4. Resume Input Handling (Backend)

### 4.1 Internal Resume Flow

If the resume is selected from the application:

1. Backend receives `resumeId`
2. Fetches resume JSON from MongoDB
3. Skips parsing and section detection
4. Sends structured resume data directly to ATS Engine

This path provides **highest accuracy**.

---

### 4.2 Uploaded Resume Flow

If a resume file is uploaded:

1. Backend receives file (PDF/DOCX)
2. File is temporarily stored in memory
3. File is passed to the Parsing Layer

---

## 5. Parsing & Normalization Layer

### 5.1 Text Extraction

Depending on file type:
- PDF → text extraction library
- DOCX → document text extraction library

The output is:
- Plain text
- No formatting information

---

### 5.2 Resume Detection (Pre-Check)

Before ATS scoring, the system evaluates:

> “Does this document resemble a resume?”

#### Resume Signals Checked
- Presence of common resume headings
- Date patterns (years, ranges)
- Bullet-like structures
- Contact information
- Skill or job-title keywords

#### Detection Outcomes
1. **Not a Resume**
2. **Weak / Poorly Structured Resume**
3. **Valid Resume**

---

### 5.3 Handling Detection Outcomes

#### Case 1: Not a Resume
- ATS scoring is aborted
- Backend returns a specific error response
- Frontend displays:
  - Clear explanation
  - Option to upload another file or create a resume

#### Case 2: Weak Resume
- ATS scoring proceeds
- Backend flags reduced confidence
- Frontend displays warning banner

#### Case 3: Valid Resume
- Full ATS scoring proceeds normally

---

## 6. Resume Normalization

For uploaded resumes:
- Extracted text is normalized into a **best-effort structure**
- Sections are inferred using heading heuristics
- Bullets and paragraphs are approximated

This normalized structure is passed to the ATS Engine, but marked as **low confidence**.

---

## 7. Rule-Based ATS Engine

### 7.1 Design Philosophy

- Fully deterministic
- No black-box AI scoring
- Each rule produces:
  - A pass/fail or weighted result
  - A human-readable explanation

---

### 7.2 Rule Categories

#### 7.2.1 Structure & Formatting Rules
- Presence of required sections
- Logical section ordering
- Bullet usage
- Absence of ATS-breaking patterns (tables, icons)

---

#### 7.2.2 Keyword Matching Rules
(Executed only if job description is provided)

- Extract keywords from job description
- Compare with resume content
- Identify:
  - Missing keywords
  - Overused keywords
  - Unsupported skills

---

#### 7.2.3 Skills Analysis Rules
- Existence of a dedicated skills section
- Skill grouping clarity
- Skill density and relevance

---

#### 7.2.4 Experience Quality Rules
- Bullet clarity
- Action verb usage
- Avoidance of vague statements
- Reasonable bullet length

---

#### 7.2.5 Consistency & Completeness Rules
- Missing dates
- Overlapping timelines
- Duplicate content
- Inconsistent tense usage

---

## 8. ATS Scoring Engine

### 8.1 Scoring Model

Each rule contributes a weighted score to categories such as:
- Formatting & Structure
- Keyword Alignment
- Section Completeness
- Skill Coverage

The final ATS score is:
- Aggregated
- Normalized to a percentage
- Clearly labeled as **estimated**

---

### 8.2 Explainability

Every score component is traceable:
- Frontend can display why points were lost
- No hidden or unexplained deductions

---

## 9. Feedback & Report Generation

The backend generates a structured feedback report:

```json
{
  "score": 72,
  "warnings": [],
  "criticalIssues": [],
  "suggestions": [],
  "strengths": []
}
```
Each feedback item includes:
- Reason
- Impact
- Suggested action

## 10. Database Design
### 10.1 ATS Report Storage (Optional)

ATS results may be stored for:
- User reference
- Comparison over time

Schema example:
```js
{
  userId: ObjectId,
  resumeId: ObjectId | null,
  source: "internal" | "uploaded",
  atsScore: Number,
  report: Object,
  createdAt: Date
}
```

# 11. Security & Reliability
- Clerk authentication protects ATS endpoints
- File size and type validation enforced
- Uploaded files are never stored permanently
- Rate limiting on ATS checks
- Clear disclaimers for uploaded resumes

# 12. Why This Architecture Works
- Structured resumes get maximum accuracy
- Uploaded resumes are handled safely and honestly
- Rule-based logic ensures explainability
- No dependency on fragile open-source ATS tools
- Scalable and maintainable design

# 13. Summary

The ATS Checker is implemented as a robust, rule-based analysis system that supports both internally created resumes and externally uploaded resumes. It combines parsing, normalization, deterministic rules, transparent scoring, and user-friendly feedback to provide realistic ATS compatibility insights without false promises or black-box behavior.