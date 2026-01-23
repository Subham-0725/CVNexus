import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    previewImageUrl: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "general",
    },

    isPremium: {
      type: Boolean,
      default: false,
    },

    version: {
      type: Number,
      default: 1,
    },

    schemaDefinition: {
      type: Object, // JSON describing sections/fields
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Template", templateSchema);
