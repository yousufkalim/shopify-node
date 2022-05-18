/**
 * Shops CRUD controllers
 * @author Shuja Naqvi
 */
import Shops from "../models/Shops.js";

/**
 * Get all shops
 * @param {object} req
 * @param {object} res
 */
export const getAll = async (req, res) => {
  try {
    const shops = await Shops.find(); // Finding all the shops from db
    res.json({ success: true, shops }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
