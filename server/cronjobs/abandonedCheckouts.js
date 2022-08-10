/**
 * Cronjobs to send email after cart abandoned
 * @author Yousuf Kalim
 */
import cron from 'node-cron';
import Carts from '../models/Carts.js';
import sendEmail from '../helpers/sendEmail.js';
import moment from 'moment';

// This cronjob will run after every 10 mins to send emails to abandoned carts
cron.schedule(
  '*/1 * * * *',
  async () => {
    try {
      // Finding all the carts by checking if we haven't send the email yet
      const carts = await Carts.find({
        'sent_emails.0': { $exists: false },
        status: 'abandoned',
      });

      let cart_ids = new Array();

      //   Sending emails to 10 to 19 min older carts
      await Promise.all(
        carts.map((cart) => {
          if (moment(cart.updatedAt).add(10, 'minutes').isBefore() && moment(cart.updatedAt).add(19, 'minutes').isAfter()) {
            cart_ids.push(cart._id); // Creating an array of id to update later
            return sendEmail(cart);
          }
        })
      );

      //   Adding the timestamp when email was sent, so that's how we will check if email is sent or not
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
      // Error
      console.log('Error occurred while sending 10 min emails', err);
    }
  },
  {
    scheduled: true,
    timezone: 'Asia/Karachi',
  }
);

// This cronjob will run everyday to send emails to abandoned carts
cron.schedule(
  '00 00 * * *',
  async () => {
    try {
      // Finding all the 24 hrs older cart by checking if we haven't send the 24 hrs email yet
      const carts = await Carts.find({
        'sent_emails.1': { $exists: false },
        status: 'abandoned',
        updatedAt: {
          $gt: new Date(Date.now() - 47 * 60 * 60 * 1000),
          $lt: new Date(Date.now() - 23 * 60 * 60 * 1000),
        },
      });

      let cart_ids = new Array();

      //   Sending emails to 24 hrs older carts
      await Promise.all(
        carts.map((cart) => {
          cart_ids.push(cart._id); // Creating an array of id to update later
          return sendEmail(cart);
        })
      );

      //   Adding the timestamp when email was sent, so that's how we will check if email is sent or not
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
      // Error
      console.log('Error occurred while sending 10 min emails', err);
    }
  },
  {
    scheduled: true,
    timezone: 'Asia/Karachi',
  }
);
