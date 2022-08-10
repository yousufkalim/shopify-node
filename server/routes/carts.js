/**
 * Cart CRUD routes
 * @author Yousuf Kalim
 */
import express from 'express';
const router = express.Router();
import { create, clicked, unsubscribe } from '../controllers/carts.js';

/**
 * ////////////////////////// Routes /////////////////////////
 * @method get get all Checkouts
 */

// Read
router.post('/', create); // create or update cart from storefront
router.get('/clicked/:token', clicked); // when user clicks on email link
router.get('/ubsubscribe', unsubscribe); // unsubscribe from cart emails

// Export
export default router;
