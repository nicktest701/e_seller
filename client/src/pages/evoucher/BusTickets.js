import React, { useState } from "react";
import {
  Stack,
  Typography,
  Box,
  Breadcrumbs,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import moment from "moment";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import TripOriginSharpIcon from "@mui/icons-material/TripOriginSharp";
import SyncAltSharpIcon from "@mui/icons-material/SyncAltSharp";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants/images";
// import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import BusSearch from "../../components/inputs/BusSearch";
import DateInput from "../../components/inputs/DateInput";
import { BusAlert, SearchRounded } from "@mui/icons-material";

function BusTickets() {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState({ id: "", city: "", region: "" });
  const [destination, setDestination] = useState({
    id: "",
    city: "",
    region: "",
  });
  const [date, setDate] = useState(Date.now());

  const handleSearch = () => {
    navigate("preview", {
      replace: true,
      state: {
        searchValue: {
          origin,
          destination,
          date: moment(date).format("LL"),
        },
      },
    });
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${IMAGES.bus_background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingBottom: 5,
      }}
    >
      <Container sx={{ paddingY: 4, paddingX: 3 }}>
        <Typography variant="h5" sx={{ color: "primary.contrastText" }}>
          Bus Tickets
        </Typography>

        <Stack rowGap={10} justifyContent="center" alignItems="center">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "secondary.contrastText",
              textShadow: "0px 2px 5px rgba(0,0,0,0.5)",
              marginTop: { xs: 5, md: 15 },
            }}
          >
            Get your tickets and travel to your destination
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 5,
              padding: 3,
            }}
          >
            <BusSearch
              label="Origin"
              value={origin}
              setValue={setOrigin}
              icon={<TripOriginSharpIcon color="secondary" />}
            />
            <IconButton size="small">
              <SyncAltSharpIcon color="dark" />
            </IconButton>

            <BusSearch
              label="Destination"
              value={destination}
              setValue={setDestination}
              icon={<FmdGoodSharpIcon color="secondary" />}
            />
            <DateInput value={date} setValue={setDate} />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ minWidth: 150, padding: "15px 10px", borderRadius: 5 }}
              endIcon={<BusAlert />}
            >
              Find Tickets
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default BusTickets;
