/**
 * Send email service
 * @author Yousuf Kalim
 */
import nodemailer from "nodemailer";
const sender_name = process.env.MAILER_DOMAIN;
const sender_email = process.env.MAILER_EMAIL;
const sender_password = process.env.MAILER_PASSWORD;

/**
 * sendEmail
 * @param {string} email
 * @param {string} password
 * @return {void}
 */
export default function sendEmail(cart) {
  return new Promise((resolve, reject) => {
    // Sender mail server config
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sender_email,
        pass: sender_password,
      },
    });

    // Send email options
    var mailOptions = {
      from: `${sender_name} <${sender_email}>`,
      to: cart.customer,
      subject: "Abandoned checkout notification",
      text: `Hello, You left an item in cart without purchasing please click the link below to complete your checkout`,
    };

    // Sending email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // Error
        reject(error);
      } else {
        // Success
        resolve({ success: true, message: "Email sent successfully" });
      }
    });
  });
}
