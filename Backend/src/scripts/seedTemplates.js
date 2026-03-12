import mongoose from "mongoose";
import dotenv from "dotenv";
import Template from "../models/Template.js";

dotenv.config();

const templates = [
  {
    slug: "clean-ats-v1",
    name: "Clean ATS",
    description: "Minimal, one-column ATS-safe resume with a straightforward structure",
    previewImageUrl: "/templates/resume_1.jpg",
    category: "ats-optimized",
    isPremium: false,
    version: 1,
    schemaDefinition: {},
  },
  {
    slug: "modern-ats-v1",
    name: "Modern ATS",
    description: "ATS-optimized layout with enhanced spacing and clearer section hierarchy",
    previewImageUrl: "/templates/resume_2.jpg",
    category: "ats-optimized",
    isPremium: false,
    version: 1,
    schemaDefinition: {},
  },
  {
    slug: "professional-sidebar-v1",
    name: "Professional Sidebar",
    description: "Two-column resume with a structured sidebar for skills, education, and contact details",
    previewImageUrl: "/templates/resume_3.png",
    category: "professional",
    isPremium: false,
    version: 1,
    schemaDefinition: {},
  },
  {
    slug: "classic-elegant-v1",
    name: "Classic Elegant",
    description: "Timeless two-column resume design with balanced typography and clean dividers",
    previewImageUrl: "/templates/resume_4.jpg",
    category: "professional",
    isPremium: false,
    version: 1,
    schemaDefinition: {},
  },
  {
    slug: "modern-creative-v1",
    name: "Modern Creative",
    description: "Contemporary resume with bold section contrast and visual emphasis for modern roles",
    previewImageUrl: "/templates/resume_5.jpg",
    category: "creative",
    isPremium: false,
    version: 1,
    schemaDefinition: {},
  },
  {
    slug: "bold-sidebar-v1",
    name: "Bold Sidebar",
    description: "High-contrast sidebar layout ideal for marketing, design, and client-facing roles",
    previewImageUrl: "/templates/resume_6.jpg",
    category: "creative",
    isPremium: false,
    version: 1,
    schemaDefinition: {},
  },
  {
    slug: "executive-clean-v1",
    name: "Executive Clean",
    description: "Refined resume format focused on leadership experience and executive-level clarity",
    previewImageUrl: "/templates/resume_7.jpg",
    category: "executive",
    isPremium: false,
    version: 1,
    schemaDefinition: {},
  },
  {
    slug: "soft-professional-v1",
    name: "Soft Professional",
    description: "Clean and approachable resume design with subtle color accents and clear structure",
    previewImageUrl: "/templates/resume_8.jpg",
    category: "professional",
    isPremium: false,
    version: 1,
    schemaDefinition: {},
  },
];

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Template.deleteMany({});
    console.log("Cleared existing templates");

    await Template.insertMany(templates);
    console.log(`✅ Seeded ${templates.length} templates`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedTemplates();
