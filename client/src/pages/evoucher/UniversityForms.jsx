import React, { useMemo, useState, useContext } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import logo from "../../assets/images/waec.jpg";
import { currencyFormatter, getCode } from "../../constants";
import { CustomContext } from "../../context/providers/CustomProvider";
import { useGetVoucherCategory } from "../../hooks/useGetVoucherCategory";
import { universityValidationSchema } from "../../config/validationSchema";
import CustomWrapper from "../../components/custom/CustomWrapper";

function UniversityForms() {
  const { customDispatch } = useContext(CustomContext);

  const [categoryType, setCategoryType] = useState({
    id: "",
    voucherType: "",
    price: 0,
  });
  const [fullName, setFullName] = useState("Nana Akwasi");
  const [email, setEmail] = useState("nicktest701@gmail.com");
  const [quantity, setQuantity] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("0543772591");

  ///Get All waec categories
  const { categories } = useGetVoucherCategory("university");

  ///Service Provider Info
  const getServiceProviderInfo = useMemo(() => {
    return getCode(phoneNumber);
  }, [phoneNumber]);

  //Calculate total amount
  const grandTotal = useMemo(() => {
    const total = Number(categoryType?.price || 0) * Number(quantity);
    return total;
  }, [categoryType, quantity]);

  const initialValues = {
    category: "university",
    categoryType,
    quantity,
    totalAmount: grandTotal,
    fullName,
    email,
    phoneNumber,
  };

  const onSubmit = (values, options) => {
    values.serviceProvider = getServiceProviderInfo.providerName;
    values.serviceProviderImage = getServiceProviderInfo.image;
    values.agentName = fullName;
    values.agentPhoneNumber = phoneNumber;
    values.agentEmail = email;

    customDispatch({
      type: "getVoucherPaymentDetails",
      payload: { open: true, data: values },
    });
  };

  return (
    <CustomWrapper img={logo} title="UNIVERSITY FORM" item=" University">
      <Formik
        initialValues={initialValues}
        validationSchema={universityValidationSchema}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ errors, values, touched, handleSubmit }) => {
          return (
            <Container
              sx={{
                padding: 3,
                bgcolor: "primary.contrastText",
              }}
              maxWidth="md"
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        bgcolor: "secondary.main",
                        width: "inherit",
                        padding: 1,
                        color: "#fff",
                      }}
                    >
                      <Typography>Voucher Details</Typography>
                    </Box>
                    <Autocomplete
                      options={categories}
                      size="small"
                      disableClearable
                      clearText=" "
                      value={categoryType}
                      onChange={(e, value) => setCategoryType(value)}
                      noOptionsText="No Voucher available"
                      isOptionEqualToValue={(option, value) =>
                        value.id === undefined ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) => option.voucherType || ""}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            label="Select University"
                            size="small"
                            error={Boolean(
                              touched?.categoryType?.voucherType &&
                                errors?.categoryType?.voucherType
                            )}
                            helperText={
                              touched?.categoryType?.voucherType &&
                              errors?.categoryType?.voucherType
                            }
                          />
                        );
                      }}
                    />
                    <small style={{ textAlign: "center" }}>
                      Price- {currencyFormatter(categoryType?.price)}
                    </small>

                    <TextField
                      size="small"
                      type="number"
                      inputMode="numeric"
                      label="Quantity"
                      required
                      fullWidth
                      value={values.quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      error={Boolean(touched.quantity && errors.quantity)}
                      helperText={touched.quantity && errors.quantity}
                    />
                    <TextField
                      size="small"
                      placeholder="Total Amount"
                      label="Total Amount"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">GH¢</InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">p</InputAdornment>
                        ),
                        readOnly: true,
                      }}
                      value={values.totalAmount}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        bgcolor: "secondary.main",
                        width: "inherit",
                        padding: 1,
                        color: "#fff",
                      }}
                    >
                      <Typography>Personal Details</Typography>
                    </Box>

                    <TextField
                      size="small"
                      placeholder="Enter your Name"
                      label="Full Name"
                      required
                      value={values.fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      error={Boolean(touched.fullName && errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />

                    <TextField
                      size="small"
                      type="email"
                      label="Email Address"
                      required
                      value={values.email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />

                    <TextField
                      size="small"
                      type="tel"
                      inputMode="tel"
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
                              sx={{
                                width: 25,
                                height: 20,
                                marginRight: 1,
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>

              <Stack justifyContent="center" alignItems="center" paddingY={2}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ width: { xs: "100%", sm: 250 } }}
                >
                  Buy
                </Button>
              </Stack>
            </Container>
          );
        }}
      </Formik>
    </CustomWrapper>
  );
}

export default UniversityForms;
