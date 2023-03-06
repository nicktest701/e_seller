import { SearchRounded } from "@mui/icons-material";
import {
  Box,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MovieSwiper from "../../components/swiper/MovieSwiper";
import AvailableTickets from "../cinema/AvailableTickets";

function CinemaTickets() {
  return (
    <Box sx={{ width: "inherit", height: "100%", bgcolor: "#0F0F0F" }}>
      <Container
        maxWidth="lg"
        sx={{ borderRadius: 4, overflow: "hidden", paddingY: 4 }}
      >
        <TextField
          placeholder="Search for Movie Ticket"
          fullWidth
          sx={{
            background: "#fff",
            marginY: 4,
            borderRadius: 5,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRounded />
              </InputAdornment>
            ),
            sx: {
              "&::placeholder": {
                color: "green",
              },
              outline: "none",
              border: "none",
            },
          }}
          inputProps={{
            style: {
              outline: "none",
              border: "none",
              "&::placeholder": {
                color: "green",
              },
            },
          }}
        />
        <MovieSwiper />
        <Stack spacing={3} paddingY={5}>
          <Typography fontWeight="bold" color="secondary">
            Available Tickets
          </Typography>

          <AvailableTickets />
        </Stack>
      </Container>
    </Box>
  );
}

export default CinemaTickets;
