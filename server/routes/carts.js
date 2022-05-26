/**
 * Checkout CRUD routes
 * @author Shuja Naqvi
 */
import express from "express";
const router = express.Router();
import { getAll, create, clicked } from "../controllers/carts.js";
import { checkAdminAuth } from "../middleware/adminAuth.js";

/**
 * ////////////////////////// Routes /////////////////////////
 * @method get get all Checkouts
 */

// Read
router.get("/", checkAdminAuth, getAll); // Get all users at once
router.post("/", create);
router.get("/clicked/:token", clicked);

// Export
export default router;
