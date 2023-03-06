import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container>
      <Typography>
        Requested page not found.<Link to="/">Go home</Link>
      </Typography>
    </Container>
  );
}

export default NotFound;
