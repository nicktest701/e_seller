const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const client = new google.auth.OAuth2({
  clientId: process.env.MAIL_CLIENT_ID,
  clientSecret: process.env.MAIL_CLIENT_SECRET,
  redirectUri: process.env.MAIL_REDIRECT_URL,
});

client.setCredentials({
  refresh_token: process.env.MAIL_REFRESH_TOKEN,
});

const sendMail = async (transaction_id, email_address) => {
  try {
    const ACCESS_TOKEN = await client.getAccessToken();

    const transportMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "aamustedresults@gmail.com",
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "aamustedresults@gmail.com",
      to: [email_address],
      subject: "FrebbyTech Consults",
      text: "Application Vouchers",
      html: "<h1>Thank you for your business!!!.</h1>",
      attachments: [
        {
          filename: `${transaction_id}.pdf`,
          path: `./vouchers/${transaction_id}.pdf`,
        },
      ],
    };

    const mailResult = await transportMail.sendMail(mailOptions);
    return mailResult;
  } catch (error) {
     console.log(error);
    throw error.message;
  }
};

module.exports = sendMail;
