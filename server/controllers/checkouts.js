/**
 * checkouts CRUD controllers
 * @author Shuja Naqvi
 */
import Checkouts from "../models/Checkouts.js";

/**
 * Get all checkouts
 * @param {object} req
 * @param {object} res
 */
export const getAll = async (req, res) => {
  try {
    const checkouts = await Checkouts.find(); // Finding all the checkouts from db
    res.json({ success: true, checkouts }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
