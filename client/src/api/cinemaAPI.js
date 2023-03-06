import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_LOCAL;

export const getAllCinemaVoucher = async (cinema) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/cinema`,
      method: "GET",
      timeout: "10000",
      timeoutErrorMessage: "Could not connect to server.Plase try again later",
      params: {
        cinema,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCinemaByVoucherType = async (voucherType) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category/cinema`,
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
export const getCinema = async (id) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category/${id}`,
      method: "GET",
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///
export const postCinema = async (newCinema) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/cinema`,
      method: "POST",
      data: newCinema,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///
export const editCinema = async (updatedCinema) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/cinema`,
      method: "PUT",
      data: updatedCinema,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///DELETE CINEMA
export const deleteCinema = async (id) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/cinema`,
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
