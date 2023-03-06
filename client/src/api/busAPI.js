import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_LOCAL;

export const getAllBusVoucher = async (bus) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/bus`,
      method: "GET",
      timeout: "10000",
      timeoutErrorMessage: "Could not connect to server.Plase try again later",
      params: {
        bus,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getBusByVoucherType = async (voucherType) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category/bus`,
      method: "GET",
      timeout: 10000,
      timeoutErrorMessage: "Could not connect to server.Plase try again later",
      params: {
        voucherType,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getBus = async (id) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/bus/${id}`,
      method: "GET",
      timeout: "10000",
      timeoutErrorMessage: "Could not connect to server.Plase try again later",
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///
export const postBus = async (newBus) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/bus`,
      method: "POST",
      data: newBus,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///
export const editBus = async (updatedBus) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/bus`,
      method: "PUT",
      data: updatedBus,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///DELETE BUS
export const deleteBus = async (id) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/bus`,
      method: "DELETE",
      params: {
        id,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
