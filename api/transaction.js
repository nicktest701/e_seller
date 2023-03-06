const axios = require("axios");
const crypto = require("crypto");
const generate_BASIC_AUTH = require("../config/basicAuth");

const requestPayment = async (mobileNumber) => {
  const id = process.env.TRANS_CLIENT_ID;
  const secret = process.env.TRANS_CLIENT_SECRET;
  const reference = process.env.X_REFERENCE_ID;
  const clientReference = crypto.randomUUID();

  // mobileNumber = "YOUR_mobileNumber_PARAMETER";
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.TRANS_API_URL}/request-money/${mobileNumber}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + generate_BASIC_AUTH(id, secret),
      },
      data: {
        amount: 0,
        title: "FrebbyTech Consults",
        description: "Request to make payment for vouchers bought",
        clientReference,
        callbackUrl:
          "https://webhook.site/4a5f8870-239c-44d7-8991-93ce078525a1",
        cancellationUrl:
          "https://webhook.site/4a5f8870-239c-44d7-8991-93ce078525a1",
        returnUrl: "https://webhook.site/4a5f8870-239c-44d7-8991-93ce078525a1",
        // logo: "http://example.com",
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  requestPayment,
};
