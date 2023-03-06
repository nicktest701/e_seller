import React from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function SubHeader({ title, to }) {
  return (
    <Box paddingY={2}>
      <Box
        display="flex"
        alignItems="center"
        paddingLeft={4}
        margin="auto"
        maxWidth="1000px"
      >
        {/* <Link to={to}> */}
        <Link to='/'>
          <IconButton sx={{ marginRight: 2 }}>
            <ArrowBackRounded />
          </IconButton>
        </Link>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Divider flexItem />
    </Box>
  );
}

export default SubHeader;
