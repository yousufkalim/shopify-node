/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
import express from "express";
const router = express.Router();
import adminRoutes from "./admins.js";

// Parent Routes
router.use("/admins", adminRoutes); // All the user routes

// Export
export default router;
