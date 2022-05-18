/**
 * Checkout CRUD routes
 * @author Shuja Naqvi
 */
import express from "express";
const router = express.Router();
import { getAll } from "../controllers/checkouts.js";
import { checkAdminAuth } from "../middleware/adminAuth.js";

/**
 * ////////////////////////// Routes /////////////////////////
 * @method get get all Checkouts
 */

// Read
router.get("/", checkAdminAuth, getAll); // Get all users at once

// Export
export default router;
