/**
 * Shops CRUD routes
 * @author Shuja Naqvi
 */
import express from "express";
const router = express.Router();
import { getAll } from "../controllers/shops.js";
import { checkAdminAuth } from "../middleware/adminAuth.js";

/**
 * ////////////////////////// Routes /////////////////////////
 * @method get get all Shops
 */

// Read
router.get("/", checkAdminAuth, getAll); // Get all users at once

// Export
export default router;
