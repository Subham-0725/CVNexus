import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { attachUser } from "../middleware/attachUser.js";

const router = express.Router();

router.get("/", requireAuth, attachUser, (req, res) => {
  res.status(200).json(req.user);
});


export default router;
