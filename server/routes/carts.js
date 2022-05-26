/**
 * Cart CRUD routes
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
router.get("/", checkAdminAuth, getAll); // Get all carts at once
router.post("/", create); // create or update cart from storefront
router.get("/clicked/:token", clicked); // when user clicks on email link

// Export
export default router;
