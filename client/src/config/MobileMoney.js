import axios from "axios";
import base64 from "react-native-base64";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjVkZWY4ODIyLTdmZGEtNDhhNi1iMDQyLWYzNTUxNDRhMWU0NCIsImV4cGlyZXMiOiIyMDIyLTA1LTA2VDA5OjMzOjU1LjU4NCIsInNlc3Npb25JZCI6IjAyY2EyMjgxLTY0OTAtNGFlOC05MTNlLWVmN2IxNWFlY2RjNyJ9.CNVxsaZxU-ki1Vzlq_MBs9LL1KI_SKjLRpY48NZ4BnODCmJr8FwyIKAERuhbGUJBd5ZfoqQjzYY5FwJRPyDHOUAPYZgFDZOp4qIlkJgomAqAFcGU-qS0HW7RpoWjm5xytRpkWMm79am-_1rPc6uLUomLuMKktVx5dUeLBrA7zZhtmpkpKlcVLUFPiOprsvmOLvr4ilXSk26ws8BMwrpSBfufLDhbU9egAo13pYdaymUs_Z76ktvw7eOrigB_1W5k_5A56u8Whajsa7wqtjmSAKWPeXtpmaLDVZPwgB7WWFyOEJ7XgAY_OErC-2_0Y0YcK_BPKjrdgqwVxm70MeOdyA";
const BASE_URL = "https://sandbox.momodeveloper.mtn.com";

export const generateToken = async (data) => {
  const basicToken = base64.encode(`${data.x_ref_id}:${data.api_key}`);
  try {
    const res = await axios({
      url: `${BASE_URL}/collection/token/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicToken}`,
        "Ocp-Apim-Subscription-Key": data.sub_key,
      },
    });

    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const accountBalance = async (data) => {
  
  
  try {
    const response = await axios({
      // url: `${BASE_URL}/collection/oauth2/v1_0/userinfo`,
      url: `${BASE_URL}/collection/v1_0/account/balance`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.access_token}`,
        "Ocp-Apim-Subscription-Key": data.sub_key,
        "X-Target-Environment": "sandbox",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const requestPay = async (data) => {
  const body = {
    amount: data.amount,
    currency: "EUR",
    externalId: data.externalId,
    payer: {
      partyIdType: "MSISDN",
      partyId: data.phoneNumber,
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
        Authorization: `Bearer ${data.access_token}`,
        "X-Reference-Id": data.reference_id_payment,
        "X-Target-Environment": "sandbox",
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": data.sub_key,
      },
    });
    if (response.status === 202) {
      return (response.data = "Accepted");
    }
    response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const requestToPayRef = async (data) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/collection/v1_0/requesttopay/${data.reference_id_payment}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        "X-Target-Environment": "sandbox",
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": data.sub_key,
      },
    });

    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const paymentNotification = async (data) => {
  const msg = "We have successfully purchased our products";
  const body = {
    notificationMessage: msg,
  };

  try {
    const response = await axios({
      url: `${BASE_URL}/collection/v1_0/requesttopay/${data.reference_id_payment}/deliverynotification`,
      method: "POST",
      data: body,
      headers: {
        notificationMessage: msg,
        Authorization: `Bearer ${data.access_token}`,
        "X-Reference-Id": id,
        "X-Target-Environment": "sandbox",
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": data.sub_key,
      },
    });

    response.data = msg;

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
