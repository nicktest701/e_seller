import React, { useContext, useState, useMemo } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
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
import { postCategory } from "../../api/categoryAPI";
import { addCategoryOptions } from "../../config/addCategoryOptions";
import Transition from "../../components/Transition";
import { UNIVERSITY_FORM_TYPE } from "../../mocks/columns";
import { globalAlertType } from "../../components/alert/alertType";

const AddUniversityCategory = () => {
  const category = localStorage.getItem("category");

  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);

  //state
  const [voucherType, setVoucherType] = useState("");
  const [voucherURL, setVoucherURL] = useState("");
  const [formType, setFormType] = useState("");
  const [price, setPrice] = useState(Number(0));

  //load options
  const options = useMemo(() => {
    setVoucherType("");
    return addCategoryOptions(category);
  }, [category]);

  const initialValues = {
    category: "university",
    voucherType,
    formType,
    price,
    voucherURL,
  };

  const { mutateAsync } = useMutation(postCategory);
  const onSubmit = (values, option) => {
    const isProtocolPresent = values.voucherURL?.includes("http");
    const newUniversityCategory = {
      category: values.category,
      voucherType: values.voucherType,
      price: values.price,
      details: {
        formType: values.formType,
        voucherURL: isProtocolPresent
          ? values.voucherURL
          : `https://${values.voucherURL}`,
      },
    };

    // console.log(newUniversityCategory);

    mutateAsync(newUniversityCategory, {
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
    customDispatch({ type: "openAddUniversityCategory", payload: false });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <Dialog
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}
            open={customState.universityCategory.open}
            onClose={handleClose}
          >
            <DialogTitle>New University</DialogTitle>
            <DialogContent>
              <Stack rowGap={2} paddingY={2}>
                <Autocomplete
                  options={options.cat}
                  freeSolo
                  noOptionsText="No form available"
                  value={voucherType || null}
                  onInputChange={(e, value) => setVoucherType(value)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(props) => (
                    <TextField {...props} label="University" />
                  )}
                />
                <Autocomplete
                  options={UNIVERSITY_FORM_TYPE}
                  freeSolo
                  noOptionsText="No option available"
                  value={formType || null}
                  onInputChange={(e, value) => setFormType(value)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(props) => (
                    <TextField {...props} label="Form Type" />
                  )}
                />
                <TextField
                  type="number"
                  inputMode="decimal"
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
                />
                <TextField
                  type="url"
                  inputMode="url"
                  label={`University Website URL`}
                  value={voucherURL}
                  onChange={(e) => setVoucherURL(e.target.value)}
                  helperText={
                    errors.voucherURL
                      ? errors.voucherURL
                      : "eg. www.universityurl.com"
                  }
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

export default React.memo(AddUniversityCategory);
