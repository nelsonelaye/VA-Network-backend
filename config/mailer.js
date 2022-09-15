const nodemailer = require("nodemailer");

require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE,
//   host: "smtp.gmail.com",
//   port: 587,
//   auth: {
//     type: "OAuth2",
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//     clientId: process.env.OAUTH_CLIENTD,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//   },
//   tls: {
//     // do not fail on invalid certs
//     rejectUnauthorized: false,
//   },
// });

// const transporter = nodemailer.createTransport({
//   host: "smtp.mail.yahoo.com",
//   port: 465,
//   secure: false,
//   service: "yahoo",
//   auth: {
//     user: process.env.YAHOO_MAIL,
//     pass: process.env.YAHOO_PASS,
//   },
//   debug: false,
//   logger: true,
//   // tls: {
//   //   // do not fail on invalid certs
//   //   rejectUnauthorized: false,
//   // },
// });

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },

  auth: {
    user: process.env.OUTLOOK_MAIL,
    pass: process.env.OUTLOOK_PASS,
  },
});

module.exports = transporter;
