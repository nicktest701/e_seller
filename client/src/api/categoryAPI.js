import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_LOCAL;

export const getAllVouchersCategory = async (category) => {
  console.log(category);
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "GET",
      timeout: "10000",
      timeoutErrorMessage: "Could not connect to server.Plase try again later",
      params: {
        category,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCategory = async (id) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category/${id}`,
      method: "GET",
      timeout: "10000",
      timeoutErrorMessage: "Could not connect to server.Plase try again later",
    });

    // const res = await fetch(`${BASE_URL}/category/${id}`);
    // const data = await res.json();
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///
export const postCategory = async (newCategory) => {
  console.log(newCategory);
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "POST",
      data: newCategory,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///
export const postCinemaTicketCategory = async (newCinemaTicket) => {
  console.table(newCinemaTicket);
  const formData = new FormData();

  formData.append("cinema", newCinemaTicket.cinema);
  formData.append("category", newCinemaTicket.category);
  formData.append("voucherType", newCinemaTicket.voucherType);
  formData.append("price", newCinemaTicket.price);
  formData.append("movie", newCinemaTicket.movie);
  formData.append("theatre", newCinemaTicket.theatre);
  formData.append("location", newCinemaTicket.location);
  formData.append("date", newCinemaTicket.date);
  formData.append("time", newCinemaTicket.time);
  formData.append("message", newCinemaTicket.message);

  try {
    const res = await axios({
      url: `${BASE_URL}/category/cinema`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
///
export const postStadiumTicketCategory = async (newStadiumTicket) => {
  // console.log(newStadiumTicket);
  const formData = new FormData();

  formData.append("category", newStadiumTicket.category);
  formData.append("voucherType", newStadiumTicket.voucherType);
  // formData.append("price", newStadiumTicket.price);
  formData.append("matchType", newStadiumTicket.matchType);
  formData.append("homeImage", newStadiumTicket.homeTeamImage);
  formData.append("home", newStadiumTicket.home);
  formData.append("awayImage", newStadiumTicket.awayTeamImage);
  formData.append("away", newStadiumTicket.away);
  formData.append("stands", JSON.stringify(newStadiumTicket.stands));
  formData.append("venue", newStadiumTicket.venue);
  formData.append("date", newStadiumTicket.date);
  formData.append("time", newStadiumTicket.time);
  formData.append("message", newStadiumTicket.message);

  try {
    const res = await axios({
      url: `${BASE_URL}/category/stadium`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///
export const editCategory = async (updatedCategory) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
      method: "PUT",
      data: updatedCategory,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

///DELETE CATEGORY
export const deleteCategory = async (id) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/category`,
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
