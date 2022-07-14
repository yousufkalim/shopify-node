/**
 * Shops CRUD controllers
 * @author Yousuf Kalim
 */
import express from "express";
import { Shopify } from "@shopify/shopify-api";
import Shops from "../models/Shops.js";
import Carts from "../models/Carts.js";

/**
 * Get shop
 * @param {object} req
 * @param {object} res
 */
export const getShop = async (req, res) => {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false);

    if (!session) {
      return res
        .status(403)
        .json({ success: false, message: "Your session has been expired" });
    }

    // Getting shop
    let shop = await Shops.findOne({ shop: session.shop });

    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    // Getting all the carts related to that shop by using project stage to get only fields that we are using.
    let carts = await Carts.aggregate([
      {
        $match: {
          shop_id: shop._id,
        },
      },
      {
        $project: {
          customer: 1,
          createdAt: 1,
          total_price: 1,
          currency: 1,
          sent_emails: 1,
          status: 1,
          "items.title": 1,
        },
      },
    ]);

    // Creating statistics to show on merchants panel
    let statistics = {
      abandoned: carts.filter((a) => a.status === "abandoned").length,
      clicked: carts.filter((a) => a.status === "clicked").length,
      recovered: carts.filter((a) => a.status === "recovered").length,
      total_value:
        carts.reduce((a, b) => a + (b.total_price || 0), 0) +
        carts[0]?.currency,
      recovered_value:
        carts
          .filter((a) => a.status === "recovered")
          .reduce((a, b) => a + (b.total_price || 0), 0) + carts[0]?.currency,
    };

    // Making array of arrays to show on merchant panel's table
    carts = carts.map((cart) => {
      let length = cart.items.length;
      let title =
        length > 1 ? ` and ${length} ${length > 2 ? "others" : "other"}` : "";
      cart.title = cart.items[0]?.title + title;
      cart.sent_emails = `${cart.sent_emails.length || "No "} ${
        cart.sent_emails.length > 1 ? "emails" : "email"
      } sent`;

      return [
        cart.customer,
        cart.title,
        new Date(cart.createdAt).toLocaleString(),
        `${cart.total_price} ${cart.currency}`,
        cart.status,
        cart.sent_emails,
      ];
    });

    // Done
    res.status(200).send({
      success: true,
      message: "Shop found successfully",
      shop,
      carts,
      statistics,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
