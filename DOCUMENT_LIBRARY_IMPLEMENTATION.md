# Document Library Implementation

## Overview
When users download a resume as PDF, it now automatically gets stored in the Document Library on the Dashboard.

## Backend Changes

### 1. New Model: Document.js
- Stores PDF/DOCX files in MongoDB as Buffer
- Fields: userId, resumeId, title, format, fileData, fileSize, templateSlug

### 2. Updated: export.controller.js
- After generating PDF, saves it to Document Library using findOneAndUpdate with upsert
- Automatically updates existing document if same resume is downloaded again

### 3. New Controller: document.controller.js
- `getDocuments`: Fetch all user documents (excludes fileData for performance)
- `downloadDocument`: Download specific document by ID
- `deleteDocument`: Delete document from library

### 4. New Route: documents.js
- GET /api/v1/documents - List all documents
- GET /api/v1/documents/:id/download - Download specific document
- DELETE /api/v1/documents/:id - Delete document

### 5. Updated: app.js
- Registered documents route

## Frontend Changes

### 1. New Page: DocumentLibrary.jsx
- Displays all downloaded resumes in a grid layout
- Shows document metadata (title, format, size, date)
- Download and delete functionality
- Empty state when no documents exist

### 2. Updated: Dashboard.jsx
- Added onClick handler to "Document Library" card
- Navigates to /documents route

### 3. Updated: App.jsx
- Added DocumentLibrary import
- Added protected route for /documents

## How It Works

1. User creates resume in Builder
2. User clicks "Download Resume" → selects PDF
3. Backend generates PDF and saves to Document Library
4. User can access Document Library from Dashboard
5. User can re-download or delete stored resumes

## API Endpoints

```
GET    /api/v1/documents              - Get all user documents
GET    /api/v1/documents/:id/download - Download document
DELETE /api/v1/documents/:id          - Delete document
```

All endpoints require authentication via Bearer token.
