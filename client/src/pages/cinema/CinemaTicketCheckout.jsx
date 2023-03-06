import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  Add,
  MoneyRounded,
  Remove,
  ShoppingCartCheckoutRounded,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import moment from "moment";
import {
  CINEMA_IMAGES,
  currencyFormatter,
  getCode,
  IMAGES,
} from "../../constants";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../api/categoryAPI";
import PayLoading from "../../components/PayLoading";
import Back from "../../components/Back";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";

function CinemaTicketCheckout() {
  const { customDispatch } = useContext(CustomContext);
  const { id } = useParams();
  const [email, setEmail] = useState("akwassi@gmail.com");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("0244192817");
  const [quantity, setQuantity] = useState(parseInt(1));
  const [price, setPrice] = useState(0);

  const addItem = useCallback(() => setQuantity((prev) => prev + 1), []);
  const removeItem = useCallback(
    () => setQuantity((prev) => (prev <= 1 ? 1 : prev - 1)),
    []
  );

  const totalAmount = useMemo(
    () => parseFloat(quantity) * parseFloat(price),
    [quantity, price]
  );

  ///Service Provider Info
  const getServiceProviderInfo = useMemo(() => {
    return getCode(phoneNumber);
  }, [phoneNumber]);

  const cinema = useQuery({
    queryKey: ["cinema-category"],
    queryFn: () => getCategory(id),
    enabled: !!id,
    onSuccess: (cinema) => {
      setTime(cinema.details.time);
      setDate(cinema.details.date);
      setPrice(cinema.price);
      console.log(cinema);
    },
  });

  const initialValues = {
    category: "cinema",
    categoryType: {
      id: cinema?.data?._id,
      voucherType: cinema?.data?.voucherType,
      price: cinema?.data?.price,
    },
    email,
    phoneNumber,
    quantity,
    totalAmount,
  };

  const onSubmit = (values, options) => {
    values.serviceProvider = getServiceProviderInfo.providerName;
    values.serviceProviderImage = getServiceProviderInfo.image;
    values.agentPhoneNumber = phoneNumber;
    values.agentEmail = email;

    customDispatch({
      type: "getVoucherPaymentDetails",
      payload: { open: true, data: values },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 4 }}>
      <Back />
      <Stack direction="row" justifyContent="flex-end" spacing={2} paddingY={2}>
        <Typography variant="h5">Check Out</Typography>
        <ShoppingCartCheckoutRounded sx={{ width: 30, height: 30 }} />
      </Stack>
      <Divider />
      <Typography
        variant="h5"
        sx={{
          width: "100%",
          bgcolor: "secondary.main",
          color: "primary.contrastText",
          padding: 1,
          marginTop: 1,
        }}
      >
        Movie Ticket Details
      </Typography>
      {cinema?.isLoading && <PayLoading />}

      <Stack
        direction={{ xs: "column", md: "row" }}
        height="inherit"
        spacing={3}
        paddingY={2}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          width="100%"
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <img
            loading="lazy"
            src={`${process.env.REACT_APP_API_LOCAL}/images/cinema/${cinema?.data?.details?.cinema}`}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "contain",
            }}
            alt="cinema_image"
          />
          <Stack spacing={1} justifyContent="center" alignItems="center">
            <Typography color="secondary" sx={{ fontWeight: "bold" }}>
              {cinema?.data?.details?.movie}
            </Typography>
            <Typography variant="body2">
              {moment(new Date(date)).format("dddd,Do MMMM,YYYY")}
            </Typography>

            <Typography variant="body2">
              {moment(new Date(time)).format("h:mm a")}
            </Typography>
            <Typography variant="h6">
              {currencyFormatter(cinema?.data?.price)}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                onClick={removeItem}
                sx={{ bgcolor: "primary.main", color: "#fff" }}
              >
                <Remove />
              </IconButton>
              <Button size="large" sx={{ width: 80 }}>
                {quantity}
              </Button>
              <IconButton
                onClick={addItem}
                sx={{ bgcolor: "secondary.main", color: "#fff" }}
              >
                <Add />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          width={{ xs: "100%", md: "40%" }}
          spacing={2}
          border="solid 1px #000"
          borderRadius={2}
          padding={2}
        >
          <Typography
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              padding: 1,
              textAlign: "center",
              width: "100%",
            }}
          >
            Payment Details
          </Typography>
          <List>
            <ListItem divider>
              <ListItemText primary="Price" />
              <ListItemSecondaryAction>
                {currencyFormatter(cinema?.data?.price)}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Quantity" />
              <ListItemSecondaryAction>
                <IconButton color="primary">{quantity}</IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="TOTAL"
                primaryTypographyProps={{
                  fontWeight: "bold",
                }}
              />
              <ListItemSecondaryAction>
                {currencyFormatter(totalAmount)}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ handleSubmit, handleReset, errors, touched }) => {
              return (
                <>
                  <Typography variant="caption">Personal Info</Typography>
                  <TextField
                    size="small"
                    type="email"
                    variant="outlined"
                    label="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    size="small"
                    type="tel"
                    inputMode="tel"
                    variant="outlined"
                    label="Phone Number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Avatar
                            variant="square"
                            src={getServiceProviderInfo?.image}
                            sx={{ width: 25, height: 20, marginRight: 2 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <LoadingButton
                    startIcon={<MoneyRounded />}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Make Payment
                  </LoadingButton>
                </>
              );
            }}
          </Formik>
        </Stack>
      </Stack>
      <Divider />
    </Container>
  );
}

export default CinemaTicketCheckout;
