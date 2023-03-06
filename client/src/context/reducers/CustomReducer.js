export const CustomReducer = (state, { type, payload }) => {
  switch (type) {
    case "openAlert":

      return {
        ...state,
        alertData: {
          severity: payload.severity,
          message: payload.message,
        },
      };
    case "closeAlert":
      return {
        ...state,
        alertData: {
          severity: "",
          message: "",
        },
      };
    case "openSidebar":
      return {
        ...state,
        openSidebar: payload,
      };
    case "openPreviewChecker":
      return {
        ...state,
        openPreviewChecker: payload,
      };

    case "getVoucherPaymentDetails":
      return {
        ...state,
        voucherPaymentDetails: payload,
      };

    case "loadedChecker":
      return {
        ...state,
        loadedChecker: {
          meta: payload.meta,
          data: payload.data,
        },
      };
    case "newCheckers":
      return {
        ...state,
        newCheckers: payload,
      };

    case "openAddCategory":
      return {
        ...state,
        category: {
          ...state.category,
          open: payload,
        },
      };
    case "openAddUniversityCategory":
      return {
        ...state,
        universityCategory: {
          ...state.category,
          open: payload,
        },
      };
    case "openAddCinemaCategory":
      return {
        ...state,
        cinemaCategory: {
          ...state.category,
          open: payload,
        },
      };
    case "openAddStadiumCategory":
      return {
        ...state,
        stadiumCategory: {
          ...state.category,
          open: payload,
        },
      };
    case "openAddBusCategory":
      return {
        ...state,
        busCategory: {
          ...state.category,
          open: payload,
        },
      };

    case "openEditCategory":
      return {
        ...state,
        editCategory: {
          open: payload.open,
          data: payload.data,
        },
      };
    case "closeEditCategory":
      return {
        ...state,
        editCategory: {
          ...state.editCategory,
          open: false,
        },
      };

    case "openEditUniversityCategory":
      return {
        ...state,

        editUniversityCategory: {
          open: payload.open,
          data: payload.data,
        },
      };

    case "closeEditUniversityCategory":
      return {
        ...state,
        editUniversityCategory: {
          ...state.editUniversityCategory,
          open: false,
        },
      };
    case "openEditCinemaCategory":
      return {
        ...state,
        editCinemaCategory: {
          open: payload.open,
          data: payload.data,
        },
      };

    case "closeEditCinemaCategory":
      return {
        ...state,
        editCinemaCategory: {
          ...state.editCinemaCategory,
          open: false,
        },
      };

    case "openEditStadiumCategory":
      return {
        ...state,
        editStadiumCategory: {
          open: payload.open,
          data: payload.data,
        },
      };
    case "closeEditStadiumCategory":
      return {
        ...state,
        editStadiumCategory: {
          ...state.editStadiumCategory,
          open: false,
        },
      };
    case "openEditBusCategory":
      return {
        ...state,
        editBusCategory: {
          open: payload.open,
          data: payload.data,
        },
      };

    case "closeEditBusCategory":
      return {
        ...state,
        editBusCategory: {
          ...state.editBusCategory,
          open: false,
        },
      };

    case "categoryType":
      return {
        ...state,
        category: {
          ...state.category,
          category: payload,
        },
      };

    case "loadVouchers":
      return {
        ...state,
        transaction: payload,
      };

    default:
      return state;
  }
};
