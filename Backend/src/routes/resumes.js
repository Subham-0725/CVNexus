import express from "express";
import Resume from "../models/Resume.js";
import Template from "../models/Template.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { attachUser } from "../middleware/attachUser.js";

const router = express.Router();

// CREATE resume from template
router.post("/", requireAuth, attachUser, async (req, res) => {
  const { templateSlug } = req.body;

  const template = await Template.findOne({ slug: templateSlug });
  if (!template) {
    return res.status(400).json({ error: "Invalid template" });
  }

  if (template.isPremium && req.user.plan !== "pro") {
    return res.status(403).json({ error: "Upgrade required" });
  }

  const resume = await Resume.create({
    userId: req.user.id,
    templateSlug,
  });

  res.status(201).json(resume);
});

// GET user's resumes
router.get("/", requireAuth, attachUser, async (req, res) => {
  const resumes = await Resume.find({ userId: req.user.id });
  res.json(resumes);
});

// GET single resume
router.get("/:id", requireAuth, attachUser, async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!resume) {
    return res.status(404).json({ error: "Resume not found" });
  }

  res.json(resume);
});

export default router;
