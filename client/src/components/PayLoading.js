import { Avatar, Backdrop, Stack } from "@mui/material";
import React from "react";
import { IMAGES } from "../constants";

function PayLoading() {
  return (
    <Backdrop
      open={true}
      sx={{ width: "100%", height: "100vh", bgcolor: "primary.contrastText" }}
    >
      <Stack spacing={2}>
        <Avatar srcSet={IMAGES.coat_of_arms} sx={{ width: 80, height: 80 }} />
        <p>Please Wait...</p>
      </Stack>
    </Backdrop>
  );
}

export default PayLoading;
