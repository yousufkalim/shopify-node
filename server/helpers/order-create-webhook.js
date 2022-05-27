/**
 * Order create webhook
 * @author Yousuf Kalim
 */
import { Shopify } from "@shopify/shopify-api";

/**
 *  Registering orders/create webhook to track orders
 * @param {Object} session
 * @returns {void}
 */
export const registerOrderCreateWebhook = (session) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Webhook } = await import(
        `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
      );

      //   Checking if we have any previously registered webhook
      let existingWebhooks = await Webhook.all({ session });

      //   If we have less then 2 webhooks it means there is only one webhook is registered called app/uninstalled
      // So now we have to register orders/create webhook
      if (existingWebhooks.length < 2) {
        const webhook = new Webhook({ session: session });
        webhook.topic = "orders/create";
        webhook.address = process.env.HOST + "/order-created";
        webhook.format = "json";
        webhook.fields = ["cart_token"];
        await webhook.save({});
      }

      //   Done
      resolve({ success: true });
    } catch (err) {
      // Error handling
      console.log("Error in webhook registration --> ", err);
      reject(err);
    }
  });
};
