import { Box } from "@mui/material";
import React from "react";
import CustomBreadCrumb from "./CustomBreadCrumb";

function CustomWrapper({ children, title, item, img }) {
  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <CustomBreadCrumb title={title} item={item} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(to top right,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${img})`,
          backgroundSize: "cover",
          paddingX: 3,
          paddingY: 10,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default CustomWrapper;
