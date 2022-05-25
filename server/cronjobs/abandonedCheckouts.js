// /**
//  * @author Yousuf Kalim
//  */
// import cron from "node-cron";
// import Shops from "../models/Shops.js";
// import Checkouts from "../models/Checkouts.js";
// import { Shopify } from "@shopify/shopify-api";
// import sendEmail from "../helpers/sendEmail.js";
// import moment from "moment";

// // Reservation Timeout
// cron.schedule(
//   "*/10 * * * *",
//   async () => {
//     try {
//       const { AbandonedCheckout } = await import(
//         `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
//       );
//       const shops = await Shops.find();

//       let checkouts = await Promise.all(
//         shops?.map(async (shop) => {
//           return AbandonedCheckout.checkouts({
//             session: shop,
//           });
//         })
//       );
//       checkouts = checkouts.map((a) => a.checkouts).flat();

//       let checkouts_to_save_in_db = new Array();
//       await Promise.all(
//         checkouts.map((checkout) => {
//           if (
//             moment(checkout.created_at).add(10, "minutes").isBefore() &&
//             moment(checkout.created_at).add(19, "minutes").isAfter()
//           ) {
//             checkout = {
//               first_name: checkout.shipping_address?.first_name,
//               last_name: checkout.shipping_address?.last_name,
//               email: checkout.email,
//               abandoned_checkout_url: checkout.abandoned_checkout_url,
//               created_at: checkout.created_at,
//               updated_at: checkout.updated_at,
//             };
//             checkouts_to_save_in_db.push(checkout);
//             return sendEmail(checkout);
//           }
//         })
//       );

//       await Checkouts.insertMany(checkouts_to_save_in_db);
//       console.log(
//         `10 min email sent successfully to ${checkouts_to_save_in_db.length} users`
//       );
//     } catch (err) {
//       console.log("Error occurred while sending 10 min emails", err);
//     }
//   },
//   {
//     scheduled: true,
//     timezone: "Asia/Karachi",
//   }
// );

// cron.schedule(
//   "00 00 * * *",
//   async () => {
//     try {
//       let checkouts = await Checkouts.find({
//         expired: false,
//         created_at: {
//           $gt: new Date(Date.now() - 47 * 60 * 60 * 1000),
//           $lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
//         },
//       });

//       await Promise.all(checkouts.map((checkout) => sendEmail(checkout)));

//       await Promise.all(
//         checkouts.map((checkout) =>
//           Checkouts.findByIdAndUpdate(checkout._id, { expired: true })
//         )
//       );
//       console.log(
//         `24 hrs email sent successfully to ${checkouts.length} users`
//       );
//     } catch (err) {
//       console.log("Error occurred while sending 10 min emails", err);
//     }
//   },
//   {
//     scheduled: true,
//     timezone: "Asia/Karachi",
//   }
// );
