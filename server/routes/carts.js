/**
 * Cart CRUD routes
 * @author Shuja Naqvi
 */
import express from "express";
const router = express.Router();
import { create, clicked } from "../controllers/carts.js";

/**
 * ////////////////////////// Routes /////////////////////////
 * @method get get all Checkouts
 */

// Read
router.post("/", create); // create or update cart from storefront
router.get("/clicked/:token", clicked); // when user clicks on email link

// Export
export default router;
