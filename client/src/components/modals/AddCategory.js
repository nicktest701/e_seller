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
import Transition from "../Transition";
import { globalAlertType } from "../alert/alertType";

const AddCategory = () => {
  const category = localStorage.getItem("category");

  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);

  //state
  const [voucherType, setVoucherType] = useState("");

  //load options
  const options = useMemo(() => {
    setVoucherType("");
    return addCategoryOptions(category);
  }, [category]);

  const initialValues = {
    category: category || "",
    voucherType,
    price: 0,
    voucherURL: "",
  };

  const { mutateAsync } = useMutation(postCategory);
  const onSubmit = (values, option) => {
    const isProtocolPresent = values.voucherURL?.includes("http");

    const newCategory = {
      category: values.category,
      voucherType: values.voucherType,
      price: values.price,
      details: {
        voucherURL: isProtocolPresent
          ? values.voucherURL
          : `https://${values.voucherURL}`,
      },
    };

    // console.log(newCategory);
    mutateAsync(newCategory, {
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
    option.setSubmitting(false);
  };

  //Close Add Category
  const handleClose = () => {
    customDispatch({ type: "openAddCategory", payload: false });
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
            open={customState.category.open}
            onClose={handleClose}
          >
            <DialogTitle>New {options.autocompleteLabel}</DialogTitle>
            <DialogContent>
              <Stack rowGap={2} paddingY={2}>
                <Autocomplete
                  options={options.cat}
                  freeSolo
                  noOptionsText="No option avaiable"
                  value={voucherType || null}
                  onInputChange={(e, value) => setVoucherType(value)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(props) => (
                    <TextField {...props} label={options.autocompleteLabel} />
                  )}
                />
                <TextField
                  type="number"
                  inputMode="decimal"
                  label="Price"
                  placeholder="Price here"
                  value={values.price}
                  onChange={handleChange("price")}
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
                  label={`${options.autocompleteLabel} Website URL`}
                  value={values.voucherURL}
                  onChange={handleChange("voucherURL")}
                  helperText={
                    errors.voucherURL ? errors.voucherURL : "eg. www.myurl.com"
                  }
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ padding: 1 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton variant="contained" onClick={handleSubmit}>
                Add Category
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default React.memo(AddCategory);
