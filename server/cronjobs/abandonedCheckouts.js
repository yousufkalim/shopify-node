/**
 * @author Yousuf Kalim
 */
import cron from "node-cron";
import Carts from "../models/Carts.js";
import sendEmail from "../helpers/sendEmail.js";
import moment from "moment";

// Reservation Timeout
cron.schedule(
  "*/10 * * * *",
  async () => {
    try {
      const carts = await Carts.find({ "sent_emails.0": { $exists: false } });
      let cart_ids = new Array();
      await Promise.all(
        carts.map((cart) => {
          if (
            moment(cart.updatedAt).add(1, "minutes").isBefore() &&
            moment(cart.updatedAt).add(10, "minutes").isAfter()
          ) {
            cart_ids.push(cart._id);
            return sendEmail(cart);
          }
        })
      );

      await Carts.updateMany(
        { _id: { $in: cart_ids } },
        {
          $push: {
            sent_emails: new Date(),
          },
        }
      );

      console.log(`10 min email sent successfully to ${cart_ids.length} users`);
    } catch (err) {
      console.log("Error occurred while sending 10 min emails", err);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Karachi",
  }
);

cron.schedule(
  "00 00 * * *",
  async () => {
    try {
      const carts = await Carts.find({
        "sent_emails.1": { $exists: false },
        updatedAt: {
          $gt: new Date(Date.now() - 47 * 60 * 60 * 1000),
          $lt: new Date(Date.now() - 23 * 60 * 60 * 1000),
        },
      });

      let cart_ids = new Array();
      await Promise.all(
        carts.map((cart) => {
          cart_ids.push(cart._id);
          return sendEmail(cart);
        })
      );

      await Carts.updateMany(
        { _id: { $in: cart_ids } },
        {
          $push: {
            sent_emails: new Date(),
          },
        }
      );

      console.log(`24 hrs email sent successfully to ${carts.length} users`);
    } catch (err) {
      console.log("Error occurred while sending 10 min emails", err);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Karachi",
  }
);
