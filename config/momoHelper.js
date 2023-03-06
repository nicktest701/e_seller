const axios = require("axios");
const { v4 } = require("uuid");

const BASE_URL = process.env.MOMO_URL_LOCAL;
/// Generate token for transaction
const generateToken = async (token, sub_key) => {
  try {
    const response = await axios({
      url: `${BASE_URL}/collection/token/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
        "Ocp-Apim-Subscription-Key": sub_key,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//Request to pay amount

const requestToPay = async (payment_details, access_token, sub_key) => {
  const transaction_reference_id = v4();

 

  const body = {
    amount: "20",
    currency: "EUR",
    externalId: "1234454433",
    payer: {
      partyIdType: "MSISDN",
      partyId: "0244599123",
    },
    payerMessage: "kjhkjhkjhkj",
    payeeNote: "strikjjhkjhkjhkjng",
  };

  try {
    const response = await axios({
      url: `${BASE_URL}/collection/v1_0/requesttopay`,
      method: "POST",
      data: body,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "X-Reference-Id": transaction_reference_id,
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": sub_key,
      },
    });

    if (response.status === 202) {
      return transaction_reference_id;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//Get transaction reference
const transactionReference = async (
  transaction_reference_id,
  access_token,
  sub_key
) => {
  try {
    const response = await axios({
      url: `${BASE_URL}/collection/v1_0/requesttopay/${transaction_reference_id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "X-Target-Environment": "sandbox",
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": sub_key,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  generateToken,
  requestToPay,
  transactionReference,
};
