import React, { useReducer } from "react";
import { CustomReducer } from "../reducers/CustomReducer";

export const CustomContext = React.createContext();
function CustomProvider({ children }) {
  const initialValues = {
    alertData: {
      severity: "",
      message: "",
    },
    openSidebar: false,
    openPreviewChecker: false,
    voucherPaymentDetails: {
      open: false,
      data: {},
    },
    loadedChecker: {
      meta: [],
      data: [],
    },
    newCheckers: [],

    ///add category
    category: {
      open: false,
      category: "",
    },
    universityCategory: {
      open: false,
      category: "",
    },
    cinemaCategory: {
      open: false,
      category: "",
    },
    stadiumCategory: {
      open: false,
      category: "",
    },
    busCategory: {
      open: false,
      category: "",
    },
    ///add category
    editCategory: {
      open: false,
      data: "",
    },
    editUniversityCategory: {
      open: false,
      data: "",
    },
    editCinemaCategory: {
      open: false,
      data: "",
    },
    editStadiumCategory: {
      open: false,
      data: "",
    },
    editBusCategory: {
      open: false,
      data: "",
    },

    ///vouchers
    transaction: {},
  };

  const [customState, customDispatch] = useReducer(
    CustomReducer,
    initialValues
  );
  return (
    <CustomContext.Provider value={{ customState, customDispatch }}>
      {children}
    </CustomContext.Provider>
  );
}

export default CustomProvider;
