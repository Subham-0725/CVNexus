# ATS Checker – Complete Feature Specification & Design

The ATS Checker is a core analytical feature of the application. Its purpose is to evaluate how well a resume is likely to be parsed, understood, and matched by common Applicant Tracking Systems (ATS), and to provide clear, actionable feedback to improve resume compatibility.

This feature is designed to be **honest, explainable, and rule-based**, avoiding fake claims of simulating real ATS software.

---

## 1. What the ATS Checker Is (Conceptual Definition)

The ATS Checker is a diagnostic tool that:
- Analyzes resume structure, content clarity, and keyword relevance
- Estimates ATS compatibility based on common ATS behaviors
- Highlights risks, gaps, and improvements
- Explains results transparently

It does **not**:
- Guarantee job selection
- Replicate a specific ATS (Workday, Greenhouse, etc.)
- Replace recruiter judgment
- Automatically rewrite resumes

---

## 2. Supported User Scenarios

The ATS Checker supports two types of users:

### 2.1 Internal Users (Resume Built Inside the App)
- User has created a resume using the Resume Builder
- Resume data is already structured and clean
- ATS analysis is more accurate and reliable

### 2.2 External Users (Resume Upload)
- User already has an existing resume
- User uploads a PDF or DOCX file
- ATS analysis is approximate due to parsing limitations

Both scenarios are valid and supported.

---

## 3. User Inputs for the ATS Checker

### 3.1 Resume Input (Mandatory)

The user must provide **one resume** using either of the following options:

#### Option A: Select Resume from Application
- User selects one of their saved resumes
- Resume data is retrieved directly from the database
- This is the **recommended and most accurate** option

#### Option B: Upload Resume (PDF or DOCX)
- User uploads a resume file
- Supported formats:
  - PDF
  - DOCX
- Scanned images or unsupported formats are rejected

Uploaded resumes are analyzed using text extraction and heuristic checks.

---

### 3.2 Job Description Input (Optional but Strongly Recommended)

- User can paste the job description text into a text area
- Used for:
  - Keyword matching
  - Skill gap analysis
  - Role-specific feedback

If no job description is provided:
- The ATS Checker still runs
- Feedback is based on general ATS best practices only

---

## 4. ATS Checker User Flow

1. User selects a resume **or** uploads a resume file
2. User optionally pastes the job description
3. User clicks **“Run ATS Check”**
4. System analyzes the input
5. User receives:
   - Estimated ATS compatibility score
   - Section-wise feedback
   - Actionable improvement suggestions

---

## 5. Resume Upload Validation & Safety Checks

Uploading a PDF or DOCX file does **not** automatically mean the document is a resume.

Before running ATS analysis, the system performs a **Resume Detection Check**.

---

## 6. Resume Detection Logic (Pre-Check)

The system evaluates whether the uploaded document reasonably resembles a resume.

### 6.1 Positive Resume Signals
- Presence of common resume headings:
  - Experience
  - Education
  - Skills
  - Projects
- Presence of dates (years or month–year patterns)
- Bullet-style text
- Contact information (email, phone)
- Job titles or degree names

### 6.2 Red Flags (Not a Resume)
- Long continuous paragraphs
- No recognizable section headings
- No dates
- No skill-like or experience-like content
- Looks like a report, assignment, certificate, or article

---

## 7. Resume Detection Outcomes

### Case 1: Not a Resume
- System confidently determines the document is not a resume

Action:
- ATS score is NOT generated
- User is shown a clear message:

> “This document does not appear to be a resume.  
> Please upload a resume or use our Resume Builder to create one.”

Options provided:
- Upload another file
- Create a resume using the application

---

### Case 2: Weak or Poorly Structured Resume
- Document resembles a resume but lacks structure

Action:
- ATS check is allowed
- Warning is displayed:

> “This resume has weak structure. ATS results may be less accurate.”

Feedback focuses on:
- Missing sections
- Formatting risks
- Recommendation to rebuild using the Resume Builder

---

### Case 3: Valid Resume
- Resume structure is acceptable

Action:
- Full ATS analysis is performed
- Results are shown normally

---

## 8. Core Areas Analyzed by the ATS Checker

### 8.1 Resume Structure & Formatting
Checks include:
- Standard section headings
- Logical section order
- Use of bullet points
- Absence of tables, columns, icons, or graphics
- Presence of dates for experience and education

---

### 8.2 Keyword Matching (If Job Description Is Provided)
- Resume text is compared with job description text
- Identifies:
  - Missing critical keywords
  - Overused keywords
  - Skills mentioned but unsupported by experience

Purpose:
- Helps resume align with job-specific language used by ATS systems

---

### 8.3 Skills Analysis
- Verifies presence of a clear skills section
- Checks if skills are grouped properly
- Flags overly generic or missing skill coverage

---

### 8.4 Experience Quality (ATS Perspective)
- Bullet clarity
- Use of action verbs
- Avoidance of vague responsibilities
- Reasonable bullet length

This focuses on **parsing clarity**, not recruiter opinion.

---

### 8.5 Consistency & Completeness
Detects:
- Missing dates
- Overlapping timelines
- Duplicate content
- Inconsistent tense usage

---

## 9. ATS Compatibility Score

If a score is shown, it must follow these rules:

- Clearly labeled as **estimated**
- Based on transparent factors
- Broken down by category

Example breakdown:
- Formatting & Structure
- Keyword Match
- Section Completeness
- Skill Coverage

The score is a guidance metric, not a guarantee.

---

## 10. Feedback & Reporting

Feedback is grouped into:

- ❌ Critical Issues (must fix)
- ⚠️ Improvements Suggested
- ✅ What’s Working Well

Each feedback item includes:
- Clear explanation
- Practical suggestion

Example:
> “React is listed in skills but not mentioned in experience bullets.”

---

## 11. Algorithm Philosophy

### Rule-Based by Design
- ATS logic is written in-house
- Based on clear, deterministic rules
- Easy to test and explain

### AI Usage (Limited & Controlled)
- AI is NOT used to calculate ATS score
- AI may assist in:
  - Grammar feedback
  - Content suggestions (separate feature)

This avoids hallucinations and black-box scoring.

---

## 12. Why Not Use Open-Source ATS Checkers Directly

- Most open-source ATS tools are demos or student projects
- Poor maintenance and unclear logic
- Not adaptable to structured resume data
- Difficult to explain results to users

Open-source tools are used only as **helpers** (e.g., parsing, text processing), not decision-makers.

---

## 13. Key Design Principles

- Honest and explainable analysis
- No false claims about real ATS systems
- User control over improvements
- Graceful handling of bad inputs
- Clear guidance instead of vague scores

---

## 14. Summary

The ATS Checker is a rule-based, transparent system that analyzes resumes—either built inside the app or uploaded as files—to estimate ATS compatibility. It handles edge cases safely, provides explainable scores and feedback, and integrates cleanly with other features like Resume Builder and AI Feedback, without relying on fake ATS simulations or black-box algorithms.

---
