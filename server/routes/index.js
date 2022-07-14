/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
import express from "express";
const router = express.Router();
import adminRoutes from "./admins.js";
import checkoutRoutes from "./carts.js";
import shopRoutes from "./shops.js";

// Parent Routes
router.use("/admins", adminRoutes); // All the user routes
router.use("/shops", shopRoutes); // All the auth routes
router.use("/carts", checkoutRoutes); // All the auth routes
// Export
export default router;
