import { Box, Typography } from "@mui/material";
import React from "react";
import background from "../../assets/images/student1.jpg";

function Jumbotron() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "60vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)) ,url(${background})`,
          backgroundSize: "cover",
          filter: `blur(2px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 10,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Frebby Tech Consults</Typography>
      </Box>
    </>
  );
}

export default Jumbotron;
