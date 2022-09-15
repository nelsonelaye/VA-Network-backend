const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const client = require("./client");

const clientId =
  "673914953711-si4et9ume7o31s9pjni5085940pvi68j.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken =
  "1//04uPm_3kvXD5VCgYIARAAGAQSNgF-L9Irtbs7Sx7JNUdWCUwKSQJkB0Z-hXwad1IXnrQml9srsNAD_q1yoKapqU_kJ91wnYWRmg";
const redirectUrl = "https://developers.google.com/oauthplayground";

const oAuth2 = google.auth.OAuth2;

const oAuth2Client = new oAuth2(
  clientId,
  clientSecret,
  process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: refreshToken });

const sendMail = async (email, firstName) => {
  const accessToken = oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "nelsonelaye@gmail.com",
      clientId: clientId,
      clientSecret: clientSecret,
      refresh_token: refreshToken,
      accessToken: accessToken.token,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "nelsonelaye@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `<h2>Hello ${firstName}, confirm your account registration</h2>`,
  };

  await transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "oAuth2",
//     user: "volunteerafricanetwork@gmail.com",
//     clientId: client.clientId,
//     clientSecret: client.clientId,
//     refreshToken: client.refreshToken,
//     accessToken: accessToken,
//   },
// });

module.exports = sendMail;
