import { Stack, Typography } from "@mui/material";
import React from "react";

const CheckerCard = () => {
  return (
    <Stack
      direction="column"
      sx={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        color: "#333",
        padding: 2,
      }}
    >
      <Typography variant="body2">BECE Checker</Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        3,4000
      </Typography>
    </Stack>
  );
};

export default CheckerCard;
