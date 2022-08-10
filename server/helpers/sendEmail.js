/**
 * Send email service
 * @author Yousuf Kalim
 */
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
const host = process.env.HOST;
const sender_email = process.env.MAILER_EMAIL;
const sender_password = process.env.MAILER_PASSWORD;

/**
 * sendEmail
 * @param {string} email
 * @param {string} password
 * @return {void}
 */
// Sender mail server config
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender_email,
    pass: sender_password,
  },
});

// Handlebars Config with Transporter
transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve('server/views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('server/views'),
    extName: '.handlebars',
  })
);

export default function sendEmail(cart) {
  return new Promise((resolve, reject) => {
    // Send email options
    var mailOptions = {
      from: `${cart.shop.split('.')[0]} <${sender_email}>`,
      to: cart.customer,
      subject: 'Your order is still open',
      template: 'abandoned',
      context: {
        items: cart.items.map((item) => {
          return ` ${item.title} - ${item.quantity}`;
        }),
        price: `${cart.total_price} ${cart.currency}`,
        checkoutUrl: `https://${cart.shop}/?epm_cart_token=${cart.token}`,
        unsubscribeUrl: `${host}/api/carts/unsubscribe?email=${cart.customer}`,
      },
    };
    // Sending email
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        // Error
        reject(error);
      } else {
        // Success
        resolve({ success: true, message: 'Email sent successfully' });
      }
    });
  });
}
