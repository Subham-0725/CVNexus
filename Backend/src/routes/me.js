import express from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import User from "../models/User.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

/**
 * GET /api/me
 * Creates MongoDB user if not exists
 */
router.get("/me", requireAuth, async (req, res) => {
  try {
    let user = await User.findOne({
      clerkUserId: req.clerkUserId,
    });

    // Create user if missing
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(req.clerkUserId);

      const primaryEmail = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId,
      )?.emailAddress;

      user = await User.create({
        clerkUserId: clerkUser.id,
        email: primaryEmail,
        fullName:
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        imageUrl: clerkUser.imageUrl,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ /api/me error:", error);
    res.status(500).json({ error: "Failed to load user" });
  }
});

export default router;
