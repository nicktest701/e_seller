import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "../../constants";
function AvailableCinemaTicketItem({ _id, price, details }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`movie/${_id}`);
  };

  return (
    <Box
      borderRadius={4}
      bgcolor="#161616"
      sx={{
        flex:1,
        minWidth: 220,
        transition: "all 150ms ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          translate: "(10px,20px)",
        },
        overflow: "hidden",
      }}
      onClick={handleNavigate}
    >
      <img
        alt="album"
        src={
          `${process.env.REACT_APP_API_LOCAL}/images/cinema/${details.cinema}` ??
          null
        }
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <Stack spacing={1} padding={2}>
        <Typography
          color="secondary"
          variant="h6"
          fontWeight="500"
          sx={{ textShadow: "0 2px 3px rgba(0,0,0,0.9)" }}
        >
          {details?.movie}
        </Typography>
        <Typography color="error" fontWeight="500">
          {currencyFormatter(price)}
        </Typography>

        <Typography variant="caption" color="gray">
          {details?.theatre} | {details?.location}
        </Typography>
        <IconButton
          color="secondary"
          sx={{ alignSelf: "flex-end" }}
          onClick={handleNavigate}
        >
          <ArrowForwardRounded />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default AvailableCinemaTicketItem;
