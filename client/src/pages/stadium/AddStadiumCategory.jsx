import React, { useContext, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";
import { postCategory, postStadiumTicketCategory } from "../../api/categoryAPI";
import Transition from "../../components/Transition";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import CustomTimePicker from "../../components/inputs/CustomTimePicker";
import moment from "moment";
import { STADIUM_STANDS, MATCH_TYPE } from "../../mocks/columns";
import { Chip, Container, FormHelperText } from "@mui/material";
import { currencyFormatter } from "../../constants";
import { globalAlertType } from "../../components/alert/alertType";

const AddStadiumCategory = () => {
  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);
  const [matchType, setMatchType] = useState("Friendly Match");
  const [homeTeamImage, setHomeTeamImage] = useState(null);
  const [awayTeamImage, setAwayTeamImage] = useState(null);
  const [home, setHome] = useState("Kotoko");
  const [away, setAway] = useState("Hearts");
  const [stand, setStand] = useState("");
  const [standError, setStandError] = useState("");
  const [standsList, setStandsList] = useState([]);
  const [venue, setVenue] = useState("Kumasi Sports Stadium");
  const [time, setTime] = useState(moment());
  const [date, setDate] = useState(moment());
  const [price, setPrice] = useState(Number(0));
  const [message, setMessage] = useState("Grab your ticket");

  const initialValues = {
    category: "stadium",
    matchType,
    home,
    away,
    price,
    venue,
    date: date,
    time: time,
    message,
    stands: standsList,
  };
  const handleHomeTeamFile = (e) => {
    if (e.target.files) {
      setHomeTeamImage(e.target.files[0]);
    }
  };

  const handleAwayTeamFile = (e) => {
    if (e.target.files) {
      setAwayTeamImage(e.target.files[0]);
    }
  };

  const handleAddStand = () => {
    if (price === "" || stand === "") {
      return;
    }

    const item = {
      id: standsList.length + 1,
      stand: stand.toUpperCase(),
      price: Number(price),
    };
    setStandsList((prev) => {
      return [...prev, item];
    });
    setStand("");
    setPrice("");
  };

  const handleRemoveStand = (id) => {
    const filteredStands = standsList.filter((item) => item.id !== id);
    setStandsList(filteredStands);
  };

  const { mutateAsync } = useMutation({
    mutationFn: postStadiumTicketCategory,
  });
  const onSubmit = (values, option) => {
    setStandError("");
    if (standsList.length === 0) {
      setStandError("No stand selected.");

      return;
    }
    const newMatchTicket = {
      category: values.category,
      voucherType: `${values.home} Vs ${values.away}(${values.matchType})`,
      // price: 0,
      matchType: values.matchType?.toUpperCase(),
      homeTeamImage,
      home: values.home,
      awayTeamImage,
      away: values.away,
      stands: standsList,
      venue: values.venue,
      date: values.date,
      time: values.time,
      message: values.message,
    };

    mutateAsync(newMatchTicket, {
      onSettled: () => {
        option.setSubmitting(false);

        queryClient.invalidateQueries(["category"]);
      },
      onSuccess: (data) => {
        customDispatch(globalAlertType("info", data));
        handleClose();
      },
      onError: (error) => {
        customDispatch(globalAlertType("error", error));
      },
    });
  };

  ///Close Add Category
  const handleClose = () => {
    customDispatch({ type: "openAddStadiumCategory", payload: false });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched, handleSubmit }) => {
        return (
          <Dialog
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}
            open={customState.stadiumCategory.open}
          >
            <DialogTitle>New Stadium Ticket</DialogTitle>
            <DialogContent>
              <Stack rowGap={2} paddingY={2}>
                <Autocomplete
                  size="small"
                  options={MATCH_TYPE}
                  freeSolo
                  closeText=""
                  disableClearable
                  noOptionsText="No match type available"
                  value={matchType || null}
                  onInputChange={(e, value) => setMatchType(value)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      label="Select match type"
                      error={Boolean(touched.matchType && errors.matchType)}
                      helperText={
                        touched.matchType && errors.matchType
                          ? errors.matchType
                          : "eg.Friendly Match,Cup Final,League Match"
                      }
                    />
                  )}
                />
                <div>
                  <label htmlFor="homeTeam">Home Team logo</label>
                  <input
                    type="file"
                    id="homeTeam"
                    onChange={(e) => handleHomeTeamFile(e)}
                  />
                </div>

                <TextField
                  size="small"
                  label="Home Team"
                  value={home}
                  onChange={(e) => setHome(e.target.value)}
                  error={Boolean(touched.home && errors.home)}
                  helperText={
                    touched.home && errors.home ? errors.home : "eg. TeamA"
                  }
                />
                <div>
                  <label htmlFor="awayTeam">Away Team logo</label>
                  <input
                    type="file"
                    id="awayTeam"
                    onChange={(e) => handleAwayTeamFile(e)}
                  />
                </div>
                <TextField
                  size="small"
                  label="Away Team"
                  value={away}
                  onChange={(e) => setAway(e.target.value)}
                  error={Boolean(touched.away && errors.away)}
                  helperText={
                    touched.away && errors.away ? errors.away : "eg. TeamB"
                  }
                />

                <Autocomplete
                  options={STADIUM_STANDS}
                  freeSolo
                  closeText=""
                  disableClearable
                  noOptionsText="No stand available"
                  value={stand || null}
                  onInputChange={(e, value) => setStand(value)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(props) => (
                    <TextField {...props} label="Select a stand" />
                  )}
                />
                <TextField
                  size="small"
                  type="number"
                  inputMode="numeric"
                  label="Price"
                  placeholder="Price here"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>GHS</Typography>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography>p</Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
                <Button variant="contained" onClick={handleAddStand}>
                  Add Stand
                </Button>
                <Container
                  maxWidth="sm"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {standsList.length !== 0
                    ? standsList.map((item) => (
                        <Chip
                          key={item?.id}
                          color="primary"
                          label={`${item?.stand}-${currencyFormatter(
                            item?.price
                          )}`}
                          onDelete={() => handleRemoveStand(item?.id)}
                        />
                      ))
                    : null}
                  {standError && (
                    <FormHelperText sx={{ color: "red" }}>
                      {standError}
                    </FormHelperText>
                  )}
                </Container>
                <TextField
                  size="small"
                  label="Venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  error={Boolean(touched.venue && errors.venue)}
                  helperText={
                    touched.venue && errors.venue
                      ? errors.venue
                      : "eg. Kumasi,Ghana"
                  }
                />
                <CustomDatePicker
                  value={date}
                  setValue={setDate}
                  customDateInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Date"
                      error={Boolean(touched.date && errors.date)}
                      helperText={touched.date && errors.date}
                    />
                  )}
                />
                <CustomTimePicker
                  value={time}
                  setValue={setTime}
                  customTimeInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Time"
                      error={Boolean(touched.time && errors.time)}
                      helperText={touched.time && errors.time}
                    />
                  )}
                />

                <TextField
                  size="small"
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={Boolean(touched.message && errors.message)}
                  helperText={touched.message && errors.message}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ padding: 1 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton variant="contained" onClick={handleSubmit}>
                Add
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default React.memo(AddStadiumCategory);
