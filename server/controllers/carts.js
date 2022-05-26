/**
 * carts CRUD controllers
 * @author Shuja Naqvi
 */
import Carts from "../models/Carts.js";
import Shops from "../models/Shops.js";

/**
 * Get all carts
 * @param {object} req
 * @param {object} res
 */
export const getAll = async (req, res) => {
  try {
    const carts = await Carts.find(); // Finding all the carts from db
    res.json({ success: true, carts }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const create = async (req, res) => {
  try {
    let { body } = req;
    body.items = JSON.parse(body.items);

    const shop = await Shops.findOne({ shop: body.host, active: true });

    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    if (body.item_count == 0) {
      let cart = await Carts.findOneAndDelete({ token: body.token });
      return res.json({
        success: true,
        message: "Cart deleted successfully",
        cart,
      }); // Success
    }

    let cart = await Carts.findOne({ token: body.token });
    if (cart) {
      cart = await Carts.findByIdAndUpdate(
        cart._id,
        { ...body, status: "abandoned" },
        { new: true }
      );
    } else {
      cart = await Carts.create({
        ...body,
        customer: body.email,
        shop: body.host,
        shop_id: shop._id,
      });
    }

    res.json({ success: true, cart }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const clicked = async (req, res) => {
  try {
    let { token } = req.params;
    await Carts.findOneAndUpdate({ token }, { status: "clicked" });
    res.json({ success: true });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
