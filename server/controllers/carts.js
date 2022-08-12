/**
 * carts CRUD controllers
 * @author Yousuf Kalim
 */
import { Shopify } from '@shopify/shopify-api';
import Carts from '../models/Carts.js';
import Shops from '../models/Shops.js';

/**
 * Create or update the cart by storefront
 * @param {object} req
 * @param {object} res
 */
export const create = async (req, res) => {
  try {
    let { body } = req;
    body.items = JSON.parse(body.items);

    const shop = await Shops.findOne({ shop: body.host, active: true });

    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    // If item count is 0, it means user has deleted it's cart and we have to remove it from DB
    if (body.item_count == 0) {
      let cart = await Carts.findOneAndDelete({ token: body.token });
      return res.json({
        success: true,
        message: 'Cart deleted successfully',
        cart,
      }); // Success
    }

    let cart = await Carts.findOne({ token: body.token });

    // If we found the cart already, it mean's user is updating it's cart
    if (cart) {
      cart = await Carts.findByIdAndUpdate(cart._id, { ...body, status: 'abandoned' }, { new: true });
    } else {
      // Creating cart for first time
      cart = await Carts.create({
        ...body,
        customer: body.email,
        shop: body.host,
        shop_id: shop._id,
      });
    }

    // Creating customer on shopify admin
    const { Customer } = await import(`@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`);
    const customer = new Customer({ session: shop });
    customer.email = cart.customer;
    await customer.save({
      update: true,
    });

    res.json({ success: true, cart }); // Success
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Email link clicked
 * @param {object} req
 * @param {object} res
 */
export const clicked = async (req, res) => {
  try {
    let { token } = req.params;
    await Carts.findOneAndUpdate({ token }, { status: 'clicked' }); // Changing the status to clicked to track if user has clicked on email link

    res.json({ success: true });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * unsubscribe cart emails
 * @param {object} req
 * @param {object} res
 */
export const unsubscribe = async (req, res) => {
  try {
    res.send('You have successfully unsubscribed from cart emails');
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
