/**
 * Admin routes
 * @author Yousuf Kalim
 */
import express from "express";
const router = express.Router();
import {
  register,
  login,
  confirmAuth,
  getAllShops,
  getAllCarts,
  getStatistics,
} from "../controllers/admins.js";
import { checkAdminAuth } from "../middleware/adminAuth.js";

// Admin Register
router.post("/", register); // Admin register
router.post("/login", login); // Admin login
router.get("/auth", checkAdminAuth, confirmAuth); // admin check auth
router.get("/", (req, res) => res.json({ message: "hello world" })); // test route

router.get("/shops", checkAdminAuth, getAllShops); // Get all users at once
router.get("/carts", checkAdminAuth, getAllCarts); // Get all carts at once
router.get("/statistics", checkAdminAuth, getStatistics);

export default router;
