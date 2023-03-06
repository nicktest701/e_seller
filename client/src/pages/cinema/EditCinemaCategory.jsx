import React, { useContext, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";
import { editCategory, getCategory } from "../../api/categoryAPI";
import moment from "moment";

import Transition from "../../components/Transition";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import CustomTimePicker from "../../components/inputs/CustomTimePicker";
import { globalAlertType } from "../../components/alert/alertType";
const EditCinemaCategory = () => {
  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);
  const editData = customState.editCinemaCategory;

  const [voucherType, setVoucherType] = useState("");
  const [theatre, setTheatre] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState(moment());
  const [date, setDate] = useState(moment());
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  const initialValues = {
    category: "cinema",
    voucherType,
    price,
    theatre,
    location,
    date: moment(date),
    time: moment(time),
    message,
  };
  const cinema = useQuery({
    queryKey: ["category", editData?.data],
    queryFn: () => getCategory(editData?.data),
    enabled: !!editData?.data,
    onSuccess: (cinema) => {
      console.log(cinema);
      setVoucherType(cinema?.voucherType);
      setTheatre(cinema?.details?.theatre);
      setLocation(cinema?.details?.location);
      setPrice(cinema?.price);
      setTime(cinema?.details?.time);
      setDate(cinema?.details?.date);
      setMessage(cinema?.details?.message);
    },
  });

  const { mutateAsync } = useMutation(editCategory);
  const onSubmit = (values, option) => {
    const newCinemaTicket = {
      id: cinema.data?._id,
      category: values.category,
      voucherType: values.voucherType,
      price: values.price,
      details: {
        movie: values.voucherType,
        theatre: values.theatre,
        location: values.location,
        date: values.date,
        time: values.time,
        message: values.message,
      },
    };

    mutateAsync(newCinemaTicket, {
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
    customDispatch({ type: "closeEditCinemaCategory" });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ values, errors, touched, handleSubmit }) => {
        return (
          <Dialog
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}
            open={editData?.open}
          >
            <DialogTitle>Edit Cinema Ticket</DialogTitle>
            <DialogContent>
              <Stack rowGap={2} paddingY={2}>
                <TextField
                  size="small"
                  label="Movie Name"
                  value={values.voucherType}
                  onChange={(e) => setVoucherType(e.target.value)}
                  error={Boolean(touched.voucherType && errors.voucherType)}
                  helperText={touched.voucherType && errors.voucherType}
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
                <TextField
                  size="small"
                  label="Cinema/Theatre Name"
                  value={theatre}
                  onChange={(e) => setTheatre(e.target.value)}
                  error={Boolean(touched.theatre && errors.theatre)}
                  helperText={touched.theatre && errors.theatre}
                />
                <TextField
                  size="small"
                  label="Cinema/Theatre Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
                />
                <CustomDatePicker
                  value={new Date(date)}
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
                  value={new Date(time)}
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

export default React.memo(EditCinemaCategory);
