import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { attachUser } from "../middleware/attachUser.js";
import {
  getDocuments,
  downloadDocument,
  deleteDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

router.get("/", requireAuth, attachUser, getDocuments);
router.get("/:id/download", requireAuth, attachUser, downloadDocument);
router.delete("/:id", requireAuth, attachUser, deleteDocument);

export default router;
