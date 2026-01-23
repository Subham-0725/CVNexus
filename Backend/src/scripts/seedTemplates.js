import mongoose from "mongoose";
import dotenv from "dotenv";
import Template from "../models/Template.js";

dotenv.config();

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const templates = [
      {
        slug: "clean-ats-v1",
        name: "Clean ATS",
        description:
          "Minimal, one-column ATS-safe resume with a straightforward structure",
        previewImageUrl: "/templates/Resume_1.png",
        isPremium: false,
        schemaDefinition: {
          sections: ["header", "experience", "education", "skills"],
        },
      },

      {
        slug: "modern-ats-v1",
        name: "Modern ATS",
        description:
          "ATS-optimized layout with enhanced spacing and clearer section hierarchy",
        previewImageUrl: "/templates/Resume_2.jpg",
        isPremium: false,
        schemaDefinition: {
          sections: ["header", "summary", "experience", "skills"],
        },
      },

      {
        slug: "professional-sidebar-v1",
        name: "Professional Sidebar",
        description:
          "Two-column resume with a structured sidebar for skills, education, and contact details",
        previewImageUrl: "/templates/Resume_3.png",
        isPremium: false,
        schemaDefinition: {
          sections: ["header", "skills", "experience", "education"],
        },
      },

      {
        slug: "classic-elegant-v1",
        name: "Classic Elegant",
        description:
          "Timeless two-column resume design with balanced typography and clean dividers",
        previewImageUrl: "/templates/Resume_4.jpg",
        isPremium: false,
        schemaDefinition: {
          sections: ["header", "experience", "education", "skills"],
        },
      },

      {
        slug: "modern-creative-v1",
        name: "Modern Creative",
        description:
          "Contemporary resume with bold section contrast and visual emphasis for modern roles",
        previewImageUrl: "/templates/Resume_5.jpg",
        isPremium: true,
        schemaDefinition: {
          sections: ["header", "summary", "experience", "projects", "skills"],
        },
      },

      {
        slug: "bold-sidebar-v1",
        name: "Bold Sidebar",
        description:
          "High-contrast sidebar layout ideal for marketing, design, and client-facing roles",
        previewImageUrl: "/templates/Resume_6.jpg",
        isPremium: true,
        schemaDefinition: {
          sections: ["header", "skills", "experience", "education"],
        },
      },

      {
        slug: "executive-clean-v1",
        name: "Executive Clean",
        description:
          "Refined resume format focused on leadership experience and executive-level clarity",
        previewImageUrl: "/templates/Resume_7.jpg",
        isPremium: true,
        schemaDefinition: {
          sections: ["header", "summary", "experience", "education"],
        },
      },

      {
        slug: "soft-professional-v1",
        name: "Soft Professional",
        description:
          "Clean and approachable resume design with subtle color accents and clear structure",
        previewImageUrl: "/templates/Resume_8.jpg",
        isPremium: false,
        schemaDefinition: {
          sections: ["header", "experience", "education", "skills"],
        },
      },
    ];

    await Template.deleteMany();
    await Template.insertMany(templates);

    console.log("✅ All 8 templates seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed templates:", error);
    process.exit(1);
  }
}

seedTemplates();
