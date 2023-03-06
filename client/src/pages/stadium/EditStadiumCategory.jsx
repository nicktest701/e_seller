import React, { useContext, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";
import { editCategory, getCategory, postCategory } from "../../api/categoryAPI";
import Transition from "../../components/Transition";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import CustomTimePicker from "../../components/inputs/CustomTimePicker";
import moment from "moment";
import { MATCH_TYPE, STADIUM_STANDS } from "../../mocks/columns";
import { currencyFormatter } from "../../constants";
import { globalAlertType } from "../../components/alert/alertType";
const EditStadiumCategory = () => {
  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);
  const editData = customState.editStadiumCategory;
  const [matchType, setMatchType] = useState("");
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [stand, setStand] = useState("");
  const [standError, setStandError] = useState("");
  const [standsList, setStandsList] = useState([]);
  const [venue, setVenue] = useState("");
  const [time, setTime] = useState(moment());
  const [date, setDate] = useState(moment());
  const [price, setPrice] = useState(Number(0));
  const [message, setMessage] = useState("");

  const initialValues = {
    category: "stadium",
    matchType,
    home,
    away,
    price,
    venue,
    date: moment(date),
    time: moment(time),
    message,
  };

  const stadium = useQuery({
    queryKey: ["category", editData?.data],
    queryFn: () => getCategory(editData?.data),
    enabled: !!editData?.data,
    onSuccess: (stadium) => {
      setMatchType(stadium.details.matchType);
      setHome(stadium.details.home);
      setAway(stadium.details.away);
      setVenue(stadium.details.venue);
      setPrice(stadium.price);
      setTime(stadium.details.time);
      setDate(stadium.details.date);
      setMessage(stadium.details.message);
      setStandsList(stadium.details?.stands);
    },
  });

  const { mutateAsync } = useMutation(editCategory);
  const onSubmit = (values, option) => {
    setStandError("");
    if (standsList.length === 0) {
      setStandError("No stand selected.");

      return;
    }

    const updatedStadiumTicket = {
      id: stadium.data?._id,
      category: values.category,
      voucherType: `${values.home} Vs ${values.away}(${values.matchType})`,
      price: 0,
      details: {
        matchType: values.matchType?.toUpperCase(),
        home: values.home,
        away: values.away,
        stands: standsList,
        venue: values.venue,
        date: values.date,
        time: values.time,
        message: values.message,
      },
    };

    mutateAsync(updatedStadiumTicket, {
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

  ///Close Add Category
  const handleClose = () => {
    customDispatch({ type: "closeEditStadiumCategory" });
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
            open={editData?.open}
          >
            <DialogTitle>Edit Stadium Ticket</DialogTitle>
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
                Save Changes
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default React.memo(EditStadiumCategory);
