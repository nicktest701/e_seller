import React, { useContext, useState, useMemo } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { CustomContext } from "../../context/providers/CustomProvider";
import { editCategory, getCategory } from "../../api/categoryAPI";
import Transition from "../../components/Transition";
import { UNIVERSITY_FORM_TYPE } from "../../mocks/columns";
import { addCategoryOptions } from "../../config/addCategoryOptions";
import { globalAlertType } from "../../components/alert/alertType";
const EditUniversityCategory = () => {
  //context
  const queryClient = useQueryClient();
  const { customState, customDispatch } = useContext(CustomContext);
  const editData = customState.editUniversityCategory;

  const [voucherType, setVoucherType] = useState("");
  const [voucherURL, setVoucherURL] = useState("");
  const [formType, setFormType] = useState("");
  const [price, setPrice] = useState(Number(0));

  const initialValues = {
    category: "university",
    voucherType,
    voucherURL,
    formType,
    price,
  };
  const university = useQuery({
    queryKey: ["category", editData?.data],
    queryFn: () => getCategory(editData?.data),
    enabled: !!editData?.data,
    onSuccess: (university) => {
      // console.log(university);
      setVoucherType(university.voucherType);
      setFormType(university?.details?.formType);
      setVoucherURL(university?.details?.voucherURL);
      setPrice(university.price);
    },
  });

  const { mutateAsync } = useMutation(editCategory);
  const onSubmit = (values, option) => {
    const isProtocolPresent = values.voucherURL?.includes("http");

    const newUniversityForm = {
      id: university.data?._id,
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

    mutateAsync(newUniversityForm, {
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

  const options = useMemo(() => {
    setVoucherType("");
    return addCategoryOptions("university");
  }, []);

  ///Close Add Category
  const handleClose = () => {
    customDispatch({ type: "closeEditUniversityCategory" });
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
            open={customState.editUniversityCategory.open}
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
                  value={price || 0}
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
                  label="University Website URL"
                  value={voucherURL || ""}
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
                Save Changes
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default React.memo(EditUniversityCategory);
