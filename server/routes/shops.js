/**
 * Shops CRUD routes
 * @author Shuja Naqvi
 */
import express from "express";
import { getAll, getShop } from "../controllers/shops.js";
import { checkAdminAuth } from "../middleware/adminAuth.js";
const router = express.Router();

/**
 * ////////////////////////// Routes /////////////////////////
 * @method get get all Shops
 */

// Read
// router.get("/", checkAdminAuth, getAll); // Get all users at once
router.get("/", getShop); // Get all users at once

// Export
export default router;
