import React from "react";
import { CardGiftcardRounded, HomeRounded } from "@mui/icons-material";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Container,
  List,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import MatchTicketItem from "./MatchTicketItem";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../api/categoryAPI";
import moment from "moment";
import img from "../../assets/images/football3.jpg";
import versus from "../../assets/images/versus.svg";

function MatchTicket({ match }) {
  const { id } = useParams();
  const imageURL = `${process.env.REACT_APP_API_LOCAL}/images/stadium`;

  const matchDetails = useQuery({
    queryKey: ["match"],
    queryFn: () => getCategory(id),
    // onSuccess: (match) => {
    //   console.log(match);
    // },
  });

  return (
    <Container sx={{ paddingY: 2 }}>
      <Breadcrumbs sx={{ paddingY: 2 }}>
        <Link to="/evoucher">Home</Link>
        <Link to="/evoucher/stadia-ticket">Tickets</Link>
        <Typography
          variant="body2"
          sx={{ color: "secondary.main", textTransform: "uppercase" }}
        >
          {matchDetails?.data?.voucherType?.split("(")[0]}
        </Typography>
      </Breadcrumbs>

      <Stack
        sx={{
          bgcolor: "secondary.main",
          borderRadius: 2,
          background: `linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.3)),url(${img})`,
          backgroundSize: "cover",
          color: "secondary.contrastText",
          paddingY: 1,
        }}
      >
        <Typography textAlign="center">
          {matchDetails?.data?.details?.matchType}
        </Typography>
        <Stack
          direction="row"
          padding={2}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography>{matchDetails?.data?.details?.home}</Typography>
          <Avatar
            variant="square"
            src={`${imageURL}/${matchDetails?.data?.details?.homeImage}`}
            sx={{ width: 50, height: 50 }}
          />

          <Avatar
            variant="square"
            src={versus}
            sx={{ width: 50, height: 50 }}
          />
          <Avatar
            variant="square"
            src={`${imageURL}/${matchDetails?.data?.details?.awayImage}`}
            sx={{ width: 50, height: 50 }}
          />
          <Typography>{matchDetails?.data?.details?.away}</Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          padding={1}
          bgcolor="primary.main"
          borderRadius={2}
        >
          <Typography variant="body2">
            {moment(new Date(matchDetails?.data?.details?.date)).format(
              "dddd,Do MMMM YYYY"
            )}
          </Typography>
          <Typography variant="body2">
            {moment(new Date(matchDetails?.data?.details?.time)).format(
              "hh:mm a"
            )}
          </Typography>
          <Typography variant="body2">
            {matchDetails?.data?.details?.venue}
          </Typography>
        </Stack>
      </Stack>

      <List
        sx={{
          paddingY: 4,
        }}
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              padding={2}
            >
              <Typography>Stand</Typography>
              {/* <Typography>Stock</Typography> */}
              <Typography>Price</Typography>
              <Typography>Action</Typography>
            </Stack>
          </ListSubheader>
        }
      >
        {matchDetails.data !== undefined
          ? matchDetails?.data?.details?.stands.map((stand) => (
              <MatchTicketItem key={stand.id} {...stand} />
            ))
          : null}
      </List>
    </Container>
  );
}

export default MatchTicket;
