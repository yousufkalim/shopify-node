/**
 * GDPR controllers
 * @author Yousuf Kalim
 */

/*!

=========================================================
* Mandatory webhooks
=========================================================

* Reference page: https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks

* Coded by Yousuf Kalim

=========================================================

The General Data Protection Regulation (GDPR) sets requirements for any party that collects, stores, or processes the personal data of individuals in Europe. However, Shopify mandates GDPR regulations for all user data, regardless of whether an individual is located in Europe.

*/

import Carts from "../models/Carts.js";
import Shops from "../models/Shops.js";

/**
 * Data request
 * @param {object} req
 * @param {object} res
 */
export const dataRequest = async (req, res) => {
  try {
    const { customer } = req.body;
    const carts = await Carts.find({ customer: customer.email });
    res.json({ success: true, message: "Data request successful", carts });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Customers redact
 * @param {object} req
 * @param {object} res
 */
export const customersRedact = async (req, res) => {
  try {
    res.json({ success: true, message: "Customers redact successful" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Shop redact
 * @param {object} req
 * @param {object} res
 */
export const shopRedact = async (req, res) => {
  try {
    const { shop_domain } = req.body;
    const shop = await Shops.findOneAndDelete({ shop: shop_domain });
    let carts = await Carts.find({ shop_id: shop._id });
    carts = carts.map((a) => a._id);
    await Carts.deleteMany({ _id: { $in: carts } });

    res.json({ success: true, message: "Shop redact successful" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
