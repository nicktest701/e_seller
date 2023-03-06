import React from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { IMAGES } from "../../constants";

function BusPreviewItem({ item }) {
  const navigate = useNavigate();

  const handleBuyTicket = () => {
    navigate(`buy/${item?._id}`, { state: item });
  };
  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          padding: 1,
          borderLeft: "2px solid #083d77",
          flex:1,
          paddingY:2
        }}
      >
        <img
          loading="lazy"
          src={IMAGES.bus1}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
          }}
          alt="bus_image"
        />
        <Stack spacing={1}>
          <Typography color="secondary" sx={{ fontWeight: "bold" }}>
            {item.voucherType}
          </Typography>
          <Typography variant="body2">
            {moment(item?.details?.date).format("dddd,Do MMMM,YYYY")}
          </Typography>
          <Typography variant="body2">
            {moment(item?.details?.time).format("h:mm a")}
          </Typography>
          <Divider />
          <Button
            variant="contained"
            sx={{ alignSelf: "flex-end", borderRadius: 2 }}
            onClick={handleBuyTicket}
          
          >
            Buy Ticket
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default BusPreviewItem;
