import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import BusSearch from "../../components/inputs/BusSearch";
import BusPreviewItem from "./BusPreviewItem";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import TripOriginSharpIcon from "@mui/icons-material/TripOriginSharp";
import SyncAltSharpIcon from "@mui/icons-material/SyncAltSharp";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useLocation } from "react-router-dom";
import DateInput from "../../components/inputs/DateInput";
import { useQuery } from "@tanstack/react-query";
import { getBusByVoucherType } from "../../api/busAPI";
import bus_not_found from "../../assets/images/bus_not_found.svg";
function BusPreview() {
  const d = { id: "", city: "", region: "" };
  const { state } = useLocation();

  const [origin, setOrigin] = useState(state?.searchValue?.origin ?? d);
  const [destination, setDestination] = useState(
    state?.searchValue?.destination ?? d
  );
  const [date, setDate] = useState(new Date());

  const searchKey = useMemo(() => {
    return `${origin?.city} to ${destination?.city}`;
  }, [origin, destination]);

  const bus = useQuery({
    queryKey: ["bus", searchKey],
    queryFn: () => getBusByVoucherType(searchKey),
    enabled: !!searchKey,
  
  });

  return (
    <Container sx={{ minHeight: "calc(100vh - 120px)", paddingX: 4 }}>
      <Stack spacing={3}>
        {origin?.city && destination?.city && (
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Typography variant="h5">{origin?.city}</Typography>
            <ArrowForward />
            <Typography variant="h5"> {destination?.city},</Typography>
          </Stack>
        )}

        <Divider />
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
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
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
            onClick={bus?.refetch}
            sx={{ minWidth: 120, padding: "15px 10px", borderRadius: 5 }}
          >
            Find Tickets
          </Button>
        </Stack>
        {bus?.isFetching && <Typography>Loading</Typography>}
        {bus?.data?.length === 0 ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
            paddingY={8}
          >
            <Avatar
              src={bus_not_found}
              alt="not found"
              sx={{
                width: { xs: 150, sm: 200, md: 250 },
                height: { xs: 150, sm: 200, md: 250 },
              }}
            />
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              Sorry we couldn't find any results
            </Typography>
            <Typography textAlign="center">
              We searched and couldn't find any bus ticket which match your
              search. Adjust your origin or destination.
            </Typography>
          </Stack>
        ) : (
          <Container
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: 5,
              paddingY: 8,
            }}
          >
            {bus.data?.map((item) => (
              <BusPreviewItem key={item._id} item={item} />
            ))}
          </Container>
        )}
      </Stack>
    </Container>
  );
}

export default BusPreview;
