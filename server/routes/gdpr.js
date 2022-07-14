/**
 * GDPR routes
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

import express from "express";
import {
  dataRequest,
  customersRedact,
  shopRedact,
} from "../controllers/gdpr.js";
const router = express.Router();

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post data request
 * @method post customers redact
 * @method post shop redact
 */

// Read
router.post("/data_request", dataRequest);
router.post("/customers_redact", customersRedact);
router.post("/shop_redact", shopRedact);

// Export
export default router;
