import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { CheckCircleRounded, ErrorRounded } from "@mui/icons-material";
import { CustomContext } from "../../context/providers/CustomProvider";
import Transition from "../Transition";
const GlobalAlert = () => {
  const {
    customState: { alertData },
    customDispatch,
  } = useContext(CustomContext);

  const handleClose = () => {
    customDispatch({
      type: "closeAlert",
    });
  };
  const borderColor = alertData?.severity === "error" ? "#B72136" : "#1890FF";

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      // open={true}
      open={alertData?.message ? true : false}
      autoHideDuration={7000}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Alert
        icon={
          alertData?.severity === "info" ? (
            <CheckCircleRounded />
          ) : (
            <ErrorRounded />
          )
        }
        severity={alertData?.severity}
        onClose={handleClose}
        sx={{
          // width: "100%",
          borderBottom: `2px solid ${borderColor}`,
        }}
      >
        {alertData?.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
