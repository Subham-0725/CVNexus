# Antigravity Prompt – ATS Resume Builder Landing Page

## ACT AS
A world-class Creative Developer (Awwwards-level) specializing in Next.js, Framer Motion, and performance-focused scrollytelling experiences for SaaS products. Strong understanding of UI storytelling, AI-product visualization, and resume/ATS domain aesthetics.

## THE TASK
Build a high-end scrollytelling landing page for an AI-powered ATS-Optimized Resume Builder (career-tech SaaS).

The core mechanic is a scroll-linked transformation animation that visually narrates the journey from:

Raw Resume → AI Analysis → ATS-Optimized Resume

using a pre-rendered image sequence generated from AI tools.

The landing page must feel professional, trustworthy, premium, and enterprise-ready — not flashy or gimmicky.

## TECH STACK
- Framework: React.js (App Router)
- Styling: Tailwind CSS
- Animation: Framer Motion
- Rendering: HTML5 Canvas (for high-performance image-sequence playback)

## VISUAL DIRECTION & COLOR

### Seamless Blending
- The website background MUST perfectly match the background color of the image sequence (eyedrop from frames).
- No visible edges or boxed visuals — the animation must feel native to the page.

### Color Palette
- Pure dark SaaS mode
- Background: `#050505` (or exact frame background)
- Headings: `text-white/90`
- Body text: `text-white/60`
- Accent: very subtle cool blue / cyan glow only where necessary

### Typography
- Inter or San Francisco
- Clean, tracking-tight
- Minimal, enterprise SaaS tone
- No playful or rounded fonts

## IMPLEMENTATION DETAILS

### 1. Sticky Canvas (Core Visual Engine)
- Create a component named `ResumeScroll.tsx`
- Outer container height: `h-[500vh]`
- Inside the container:
  - `<canvas>` element
  - `sticky top-0 h-screen w-full`
  - Perfectly centered
- The canvas is the hero element; everything else supports it.

### 2. Scroll Logic (Image Sequence Animation)
- Load an image sequence generated via Google Flow  
  Example naming:
  - `frame_000.webp` → `frame_119.webp`
- Use `useScroll` from Framer Motion:
  - Map scroll progress `0 → 1`
  - To frame index `0 → lastFrame`
- On each scroll tick:
  - Draw the correct frame to the canvas
  - Maintain aspect ratio using `contain`
  - No flicker, no stretching

Smooth interpolation is mandatory. Any stutter is unacceptable.

### 3. Scrollytelling Text Overlays (Narrative Layer)

#### 0% Scroll – Creation State
**Build Your Resume.**  
Clean. Structured. Professional.

Visual: raw resume cards floating calmly.

#### 30% Scroll – AI Analysis Begins
**AI Analyzes Every Detail.**  
Structure, keywords, clarity, impact.

Visual: data lines activate, resumes begin transforming.

#### 60% Scroll – ATS Optimization
**Optimized for ATS Systems.**  
Aligned with recruiter expectations.

Visual: ATS scoring interface visible, organized data flows.

#### 90% Scroll – Completion State
**Ready to Apply.**  
Confident. Optimized. Job-ready.

Visual: final polished resume state.

Text transitions:
- Fade + slight vertical motion only
- No flashy effects

### 4. Performance & Polish (Non-Negotiable)
- Preload all frames before animation starts
- Show a subtle loading state (spinner or progress bar)
- Prevent layout shift
- Canvas must scale correctly on mobile (`object-contain`)
- Disable animation on very low-end devices if necessary

## OUTPUT
Generate complete, production-ready code for:
- `app/page.tsx`
- `components/ResumeScroll.tsx`
- `app/globals.css`

Use nano banana only for UI primitives if needed, not for animation logic.

## QUALITY BAR
This landing page should feel:
- Like a serious career tool
- Like something a recruiter wouldn’t laugh at
- Like a product that could realistically charge money

Avoid:
- Crypto vibes
- Over-glow
- Sci-fi HUD overload
- Random particle effects

Clarity beats cleverness for this product.
