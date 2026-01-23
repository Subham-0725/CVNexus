import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    templateSlug: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Resume",
    },

    data: {
      type: Object,
      default: {},
    },

    isDraft: {
      type: Boolean,
      default: true,
    },

    version: {
      type: Number,
      default: 1,
    },

    lastEditedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Resume", resumeSchema);
