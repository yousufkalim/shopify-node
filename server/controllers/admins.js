/**
 * Admin controllers
 * @author Yousuf Kalim
 */
import Admins from "../models/Admins.js";
import Shops from "../models/Shops.js";
import Carts from "../models/Carts.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const tokenSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT || 10;

/**
 * Create Admin - Signup
 * @param {object} req
 * @param {object} res
 */
export const register = async (req, res) => {
  try {
    let { email, password, confirmPassword } = req.body; // Getting required fields from body
    const existingAdmin = await Admins.findOne({ email }); // Finding already existing user

    // Extra Validations
    if (existingAdmin) {
      // If we found existing user in db
      return res
        .status(409)
        .json({ success: false, message: "Admin already exists." });
    } else if (password !== confirmPassword) {
      // Passwords not same
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password are not same.",
      });
    }

    // Creating User
    req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt)); // Hashing the password with salt 8
    const admin = await Admins.create(req.body); // Adding user in db

    // Done
    res.json({ success: true, admin }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Login
 * @param {object} req
 * @param {object} res
 */
export const login = async (req, res) => {
  try {
    // Getting email and password
    const { email, password } = req.body;

    // Getting user from db
    let admin = await Admins.findOne({ email });

    if (!admin) {
      // If admin not found
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    } else if (!admin.active) {
      // If admin not found
      return res
        .status(400)
        .json({ success: false, message: "Your account is not activated" });
    }

    // Comparing password
    const isMatched = bcrypt.compareSync(password, admin.password);

    if (!isMatched) {
      // If password not matched
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    // Creating payload with admin object
    const payload = { admin };

    // Generating token
    jwt.sign(payload, tokenSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      // done
      res.json({ success: true, admin, token });
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Confirm auth
 * @param {object} req
 * @param {object} res
 */
export const confirmAuth = async (req, res) => {
  // If user authenticated
  res.json({ success: true, admin: req.admin, token: req.token });
};

/**
 * Get all shops
 * @param {object} req
 * @param {object} res
 */
export const getAllShops = async (req, res) => {
  try {
    const shops = await Shops.find(); // Finding all the shops from db
    res.json({ success: true, shops }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all carts
 * @param {object} req
 * @param {object} res
 */
export const getAllCarts = async (req, res) => {
  try {
    const carts = await Carts.find(); // Finding all the carts from db
    res.json({ success: true, carts }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
