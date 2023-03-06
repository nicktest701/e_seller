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
import { currencyFormatter, getCode, IMAGES } from "../../constants";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../api/categoryAPI";
import Back from "../../components/Back";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";

function MatchTicketCheckout() {
  const imageURL = `${process.env.REACT_APP_API_LOCAL}/images/stadium`;
  const { customDispatch } = useContext(CustomContext);
  const { id, stand } = useParams();
  const [email, setEmail] = useState("akwasi@gmail.com");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("0244192817");
  const [quantity, setQuantity] = useState(parseInt(1));
  const [stadiumStandType, setStadiumStandType] = useState("");
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

  const stadium = useQuery({
    queryKey: ["stadium-category"],
    queryFn: () => getCategory(id),
    enabled: !!id && !!stand,
    onSuccess: (stadium) => {
      setHome(stadium.details.home);
      setAway(stadium.details.away);
      setTime(stadium.details.time);
      setDate(stadium.details.date);

      const priceDetails = stadium?.details?.stands.find(
        ({ id }) => id === Number(stand)
      );
      setStadiumStandType(priceDetails.stand);
      setPrice(priceDetails.price);
    },
  });
  const initialValues = {
    category: "stadium",
    categoryType: {
      id: stadium?.data?._id,
      voucherType: stadium?.data?.voucherType,
      stand: stadiumStandType,
      price,
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
    <Container sx={{ padding: 4 }}>
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
        Ticket Details
      </Typography>
      {/* {stadium?.isLoading && <PayLoading />} */}

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
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography>{stadium?.data?.details?.matchType}</Typography>
          <Stack
            direction="row"
            padding={2}
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <Avatar
                variant="square"
                src={`${imageURL}/${stadium?.data?.details?.homeImage}`}
                sx={{ width: 70, height: 70 }}
              />
              <Typography>{home}</Typography>
            </Stack>
            <Typography>Vs</Typography>
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <Avatar
                variant="square"
                src={`${imageURL}/${stadium?.data?.details?.awayImage}`}
                sx={{ width: 70, height: 70 }}
              />
              <Typography>{away}</Typography>
            </Stack>
          </Stack>

          <Stack spacing={1} justifyContent="center" alignItems="center">
            {/* <Typography color="secondary" sx={{ fontWeight: "bold" }}>
              {stadium?.data?.voucherType}
            </Typography> */}
            <Typography variant="body2">
              {moment(new Date(date)).format("dddd,Do MMMM,YYYY")}
            </Typography>

            <Typography variant="body2">
              {moment(new Date(time)).format("hh:mm a")}
            </Typography>
            <Typography variant="h6">{currencyFormatter(price)}</Typography>

            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              border="1px solid black"
              borderRadius={1}
              padding={2}
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
              <ListItemText primary={`Price (${stadiumStandType})`} />
              <ListItemSecondaryAction>
                {currencyFormatter(price)}
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

export default MatchTicketCheckout;
