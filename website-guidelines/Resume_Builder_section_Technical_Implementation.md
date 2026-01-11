# Resume Builder – Technical Architecture & Implementation

This document explains the complete technical design and implementation of the **Resume Builder** feature, including frontend architecture, backend APIs, database schema, and AI integration, using the finalized tech stack.

The Resume Builder is designed as a **structured data editor with live rendering**, not a document editor. This design ensures ATS compatibility, AI reliability, and scalable feature expansion.

---

## 1. High-Level Architecture Overview

The Resume Builder follows a **clean separation of concerns**:

Frontend (React)<br>↓<br>Backend API (Node + Express)<br>↓<br>Database (MongoDB)<br>↓<br>AI Services / Export Services

ResumeBuilderPage<br>
├── TopToolbar<br>
├── ResumeEditorPanel (Left)<br>
└── ResumePreviewPanel (Right)


Layout is handled using **Tailwind CSS** with responsive grid/flex utilities.

---

### 2.2 State Management (Core Mechanism)

The entire Resume Builder operates on **one central resume state object**.

#### State Characteristics
- Single source of truth
- Shared between editor and preview
- Updated in real time
- Serializable to backend

#### Tool Used
- **Zustand**

Zustand is used to:
- Store resume data
- Track selected template
- Trigger live preview updates
- Avoid prop drilling and complex reducers

---

### 2.3 Resume Data Model (Frontend Representation)

The resume is represented as a structured JavaScript object:

```js
{
  personalDetails: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    links: []
  },
  summary: "",
  experience: [
    {
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      bullets: []
    }
  ],
  education: [],
  skills: {
    technical: [],
    soft: []
  },
  projects: [],
  templateId: "template_1"
}
```
#### This structure:

- Maps directly to the database schema
- Is reused for AI processing and exports
- Guarantees consistency across templates

### 2.4 Resume Editor Panel (Left Section)

Each resume section is implemented as a controlled form component.

### Components
ResumeEditorPanel<br>
├── PersonalDetailsSection<br>
├── SummarySection<br>
├── ExperienceSection<br>
│   └── ExperienceItem<br>
├── EducationSection<br>
├── SkillsSection<br>
├── ProjectsSection

### UI Tools

- shadcn/ui
<br> -Input
<br> -Textarea
<br> -Accordion
<br> -Button
<br> -Dialog
- Tailwind CSS for layout and spacing

#### Behavior
- Inputs update resume state directly
- Add/remove buttons manipulate arrays
- No rich text or contenteditable fields
- Plain text only (ATS-safe)

### 2.5 AI Integration (Frontend)

Each text field or bullet includes an “Improve with AI” button.<br><br>
User Text<br>
 → Click AI Button<br>
 → POST request to backend<br>
 → Show loading state<br>
 → Display AI suggestion<br>
 → User accepts or rejects

#### AI suggestions:
- Never auto-save
- Apply only to the selected field
- Require explicit user confirmation

### 2.6 Live Resume Preview Panel (Right Section)

The preview panel renders the resume using fixed templates.

#### Template System
- Each template is a React component
- All templates consume the same resume data
- Only layout/order/styling differs

#### Example:
```jsx
<TemplateOne resume={resumeData} />
```

#### Behavior
- Preview updates instantly on state change
- Template switching is client-side only
- No backend interaction required

### 2.7 Validation & Inline Feedback
#### Tool Used
- Zod

#### Zod is used for:

- Required field validation
- Minimum content length checks
- Structural consistency

#### Validation runs:

- On field blur
- Before save
- Before export

Warnings are shown inline using shadcn UI components.

## 3. Backend Architecture (Node + Express)

### 3.1 Core Responsibilities

The backend handles:
- Resume persistence
- AI text improvement
- Validation enforcement
- Export orchestration

### 3.2 Resume APIs
Create / Update Resume

``` bash
POST /api/resumes
PUT  /api/resumes/:id
```

#### Backend flow:
- Authenticate user via Clerk
- Validate resume data using Zod
- Store resume JSON in MongoDB
- Return saved resume ID

#### 3.3 AI Improvement API
```
POST /api/ai/improve-text
```
#### Request payload:
```
{
  "text": "user written content",
  "context": "resume_section_type"
}
```

#### Backend steps:

1. Sanitize input
2. Construct strict AI prompt
3. Call OpenAI / Gemini API
4. Return improved text

AI rules enforced at backend:
- No hallucination
- No fake metrics
- No invented companies

### 3.4 Export APIs

```
POST /api/export/pdf
POST /api/export/docx

```

#### Backend flow:

1. Fetch resume data from MongoDB
2. Inject data into template
3. Generate file
4. Stream file to client

## 4. Database Design (MongoDB)

### 4.1 Resume Collection

Each resume is stored as a document, not a file.

#### Schema Overview 
```js
{
  userId: ObjectId,
  resumeData: Object,
  templateId: String,
  createdAt: Date,
  updatedAt: Date
}
```
#### Key Characteristics
- Fully structured JSON
- User-owned via Clerk userId
- Supports multiple resumes per user
- Easily versionable in future

## 5. Export Implementation

### 5.1 PDF Export
- Puppeteer
- Server-side HTML rendering
- ATS-safe formatting
- Consistent layout

### 5.2 DOCX Export
- docxtemplater
- Word templates per resume layout
- Produces fully editable .docx files
- Compatible with Word & Google Docs

## 6. Security & Reliability Considerations
- Clerk protects all resume endpoints
- Rate limiting applied to AI endpoints
- AI prompts constrained to prevent abuse
- No client-side AI calls
- No file uploads in Resume Builder

## 7. Key Design Decisions (Why This Architecture)
- Structured data over document editing
- Fixed templates for ATS safety
- AI as assistive, not authoritative
- Clear separation between editor, preview, and export
- Backend-enforced validation

#### This ensures:
- Predictable behavior
- Explainable outputs
- Production stability

## 8. Summary

The Resume Builder is implemented as a state-driven React application backed by a structured MongoDB data model, with AI-powered text enhancement and server-side export generation.

#### This architecture prioritizes:
- ATS compatibility
- User control
- Scalability
- Maintainability

It avoids unnecessary complexity while enabling powerful resume-building capabilities.