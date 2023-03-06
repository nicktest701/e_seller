import { Box, Container, Stack, Typography } from "@mui/material";
import { SearchRounded, SportsFootballRounded } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

import img from "../../assets/images/football.jpg";
import StadiumTicketItem from "../stadium/StadiumTicketItem";
import { getAllVouchersCategory } from "../../api/categoryAPI";
function StadiaTickets() {
  const footballTickets = useQuery({
    queryKey: ["stadia"],
    queryFn: () => getAllVouchersCategory("stadium"),
    onSuccess: (tickets) => {
      // console.log(tickets);
    },
  });

  return (
    <Box sx={{ width: "100vw", height: "100vh", paddingBottom: 5 }}>
      <Box
        sx={{
          width: "100%",
          background: `linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.3)),url(${img})`,
          backgroundSize: "cover",
          minHeight: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: 5,
          padding: 2,
        }}
      >
        <div className="search_form_control">
          <input type="text" placeholder="Search for Event..." />
          <SearchRounded
            sx={{
              position: "absolute",
              right: "5px",
              top: "10px",
              width: 50,
              height: 50,
            }}
          />
        </div>
        <Typography textAlign="center" variant="h4" color="#fff">
          Get Your Football Ticket Now !!!
        </Typography>
      </Box>
      <Container maxWidth="md" sx={{ paddingY: 5 }}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          bgcolor="secondary.main"
          color="secondary.contrastText"
          padding={2}
        >
          <SportsFootballRounded />
          <Typography variant="h6">Latest Football Tickets</Typography>
        </Stack>
        {footballTickets.isFetching && (
          <Typography>Loading Fxtures please wait.....</Typography>
        )}

        {footballTickets.data !== undefined && (
          <Container
            sx={{
              paddingY: 2,
              maxHeight: 600,
              overflowY: "scroll",
            }}
          >
            {footballTickets.data.map((ticket) => (
              <StadiumTicketItem key={ticket?._id} {...ticket} />
            ))}
          </Container>
        )}
      </Container>
    </Box>
  );
}

export default StadiaTickets;
