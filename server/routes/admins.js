import express from "express";
const router = express.Router();
import { register, login, confirmAuth } from "../controllers/admins.js";
import { checkAdminAuth } from "../middleware/adminAuth.js";

// Admin Register
router.post("/", register);
router.post("/login", login);
router.get("/auth", checkAdminAuth, confirmAuth);
router.get("/", (req, res) => res.json({ message: "hello world" }));

export default router;
