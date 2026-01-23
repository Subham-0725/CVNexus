import express from "express";
import Template from "../models/Template.js";

const router = express.Router();

// GET all templates
router.get("/", async (req, res) => {
  const templates = await Template.find({}, "-schemaDefinition");
  res.json(templates);
});

// GET single template
router.get("/:slug", async (req, res) => {
  const template = await Template.findOne({ slug: req.params.slug });
  if (!template) {
    return res.status(404).json({ error: "Template not found" });
  }
  res.json(template);
});

export default router;
