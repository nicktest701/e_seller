const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "875564393300-hb6hgvng1vkt937s1jmv7dbebqjmk8l5.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "hhtps://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04qm8gkJhayqsCgYIARAAGAQSNwF-L9IrOILTK46y0skCWd-7ZAiAtDD8usa9W1cilkA86XVilUF11GD4Whk99hhrD42iHsMniIA";

const client = new google.auth.OAuth2({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URL,
});
client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const sendMail = async () => {
  try {
    const ACCESS_TOKEN = await client.getAccessToken();

    const transportMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "nicktest701@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
    });

    const mailOptions = {
      from: "nicktest701@gmail.com",
      to: ["phreshboune17@gmail.com", "kwasiowusuansah00@gmail.com"],
      subject: "Hello from nick",
      text: "hello from nick",
      html: "hello",
      attachments: [{ filename: "me.pdf", path: "./me.pdf" }],
    };

    const mailResult = await transportMail.sendMail(mailOptions);
    console.log(mailResult);
  } catch (error) {
    console.log(error);
  }
};

sendMail();
