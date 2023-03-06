import React from "react";
import {
  Avatar,
  Button,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
function StadiumTicketItem({ _id, details }) {
  const navigate = useNavigate();

  const handleNavigateToMatch = () => {
    navigate(`match/${_id}`);
  };
  return (
    <ListItemButton
      divider
      onClick={handleNavigateToMatch}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        paddingY: 3,
        gap: 2,
      }}
    >
      <Stack justifyContent="center" spacing={1}>
        <Typography>{details.matchType}</Typography>
        <Stack
          direction="row"
          padding={1}
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Typography>{details?.home}</Typography>
          <Avatar
            variant="square"
            src={`${process.env.REACT_APP_API_LOCAL}/images/stadium/${details.homeImage}`}
          />
          <Typography>Vs</Typography>
          <Avatar
            variant="square"
            src={`${process.env.REACT_APP_API_LOCAL}/images/stadium/${details.awayImage}`}
          />
          <Typography>{details?.away}</Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          <Typography variant="body2">{details?.venue}</Typography>
          <Typography variant="body2">
            {moment(new Date(details?.date)).format("Do MMMM YYYY")}
          </Typography>
          <Typography variant="body2">
            {moment(new Date(details?.time)).format("hh:mm a")}
          </Typography>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleNavigateToMatch}
      >
        Get Ticket
      </Button>
    </ListItemButton>
  );
}

export default StadiumTicketItem;
