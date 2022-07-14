/**
 * Shops CRUD routes
 * @author Yousuf Kalim
 */
import express from "express";
import { getShop } from "../controllers/shops.js";
const router = express.Router();

/**
 * ////////////////////////// Routes /////////////////////////
 * @method get get all Shops
 */

// Read
router.get("/", getShop); // Get all users at once

// Export
export default router;
