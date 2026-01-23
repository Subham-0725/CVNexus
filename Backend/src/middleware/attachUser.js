import User from "../models/User.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const attachUser = async (req, res, next) => {
  try {
    const clerkUserId = req.auth.clerkUserId;

    let user = await User.findOne({ clerkUserId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkUserId);

      user = await User.create({
        clerkUserId,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        fullName:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
        imageUrl: clerkUser.imageUrl,
        plan: "free",
      });
    }

    req.user = {
      id: user.clerkUserId,
      email: user.email,
      plan: user.plan,
    };

    next();
  } catch (err) {
    console.error("attachUser error:", err);
    res.status(500).json({ error: "Failed to attach user" });
  }
};
