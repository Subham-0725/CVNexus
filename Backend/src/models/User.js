import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      unique: true,
      index: true,
    },
    email: String,
    fullName: String,
    imageUrl: String,
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
