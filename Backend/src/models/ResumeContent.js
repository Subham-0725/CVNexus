import mongoose from "mongoose";

const resumeContentSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      unique: true,
      index: true,
    },

    userId: {
      type: String,
      required: true,
      index: true,
    },

    personalInfo: {
      fullName: String,
      headline: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      img: String,
    },

    summary: {
      type: String,
      default: "",
    },

    technicalSkills: {
      type: [String],
      default: [],
    },

    softSkills: {
      type: [String],
      default: [],
    },

    workExperience: {
      type: [
        {
          role: String,
          company: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      default: [],
    },

    projects: {
      type: [
        {
          title: String,
          link: String,
          description: String,
        },
      ],
      default: [],
    },

    education: {
      type: [
        {
          institution: String,
          degree: String,
          year: String,
          description: String,
        },
      ],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    certifications: {
      type: [String],
      default: [],
    },

    languages: {
      type: [String],
      default: [],
    },

    hobbies: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("ResumeContent", resumeContentSchema);

