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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";
import { editCategory, getCategory } from "../../api/categoryAPI";
import { addCategoryOptions } from "../../config/addCategoryOptions";
import Transition from "../Transition";
import { globalAlertType } from "../alert/alertType";

const EditCategory = () => {
  const category = localStorage.getItem("category");

  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);
  const editData = customState.editCategory;
  //state
  const [voucherType, setVoucherType] = useState("");
  const [price, setPrice] = useState(0);
  const [voucherURL, setVoucherURL] = useState("");

  //load options
  const options = useMemo(() => {
    setVoucherType("");
    return addCategoryOptions(category);
  }, [category]);

  const initialValues = {
    category: category || "",
    voucherType,
    price,
    voucherURL,
  };

  const waec = useQuery({
    queryKey: ["category", editData?.data],
    queryFn: () => getCategory(editData?.data),
    enabled: !!editData?.data,
    onSuccess: (waec) => {
      setPrice(waec?.price);
      setVoucherType(waec?.voucherType);
      setVoucherURL(waec?.details?.voucherURL);
    },
  });

  const { mutateAsync } = useMutation(editCategory);
  const onSubmit = (values, option) => {
    const isProtocolPresent = values.voucherURL?.includes("http");

    const modifiedCategory = {
      id: waec.data?._id,
      category: values.category,
      voucherType: values.voucherType,
      price: values.price,
      details: {
        voucherURL: isProtocolPresent
          ? values.voucherURL
          : `https://${values.voucherURL}`,
      },
    };

    mutateAsync(modifiedCategory, {
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

  //Close Add Category
  const handleClose = () => {
    customDispatch({ type: "closeEditCategory", payload: false });
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
            open={customState.editCategory.open}
            onClose={handleClose}
          >
            <DialogTitle>Edit {options.autocompleteLabel}</DialogTitle>
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
                Save Changes
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default React.memo(EditCategory);
