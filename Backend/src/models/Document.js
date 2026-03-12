import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    format: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },

    fileData: {
      type: Buffer,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    templateSlug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Document", documentSchema);
