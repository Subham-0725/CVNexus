import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    imageUrl: {
      type: String,
    },

    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },

    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
