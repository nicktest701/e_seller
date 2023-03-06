import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import LoadingButton from "@mui/lab/LoadingButton";
import CloseSharp from "@mui/icons-material/CloseSharp";
import MoneyRounded from "@mui/icons-material/MoneyRounded";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CustomContext } from "../../context/providers/CustomProvider";
import { currencyFormatter } from "../../constants";
import { makePayment } from "../../api/paymentAPI";
import Transition from "../Transition";
import VoucherPlaceHolderItem from "../items/VoucherPlaceHolderItem";
import { globalAlertType } from "../alert/alertType";

function VoucherPaymentDetails() {
  const { customState, customDispatch } = useContext(CustomContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  ///payment details
  const open = customState.voucherPaymentDetails.open;
  const payload = customState.voucherPaymentDetails.data;

  //Make Payment
  const paymentMutate = useMutation(makePayment);
  const handlePayment = () => {
    setLoading(true);

    paymentMutate.mutateAsync(payload, {
      onSettled: () => {
        setLoading(false);
      },
      onSuccess: (data) => {
        if (data) {
          // if (data.code === "201") {
          //   window.location.href = data?.data?.paylinkUrl;
          // }
          customDispatch({ type: "loadVouchers", payload: data });
          console.log("Payment done!");

          navigate(`/checkout`, {
            replace: true,
            state: {
              transactionId: data?.info?.transaction_id,
              voucherCategory: data?.info.voucherCategory,
            },
          });

          customDispatch({
            type: "getVoucherPaymentDetails",
            payload: { open: false, data: {} },
          });
        }
      },
      onError: (error) => {
        customDispatch(globalAlertType("info", error));
      },
    });
  };

  //close Payment Details
  const handleClose = () => {
    customDispatch({
      type: "getVoucherPaymentDetails",
      payload: {
        open: false,
        data: {},
      },
    });
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      maxWidth="xs"
      fullWidth
    >
      {loading ? null : (
        <IconButton
          sx={{ alignSelf: "end", marginTop: 1 }}
          onClick={handleClose}
        >
          <CloseSharp />
        </IconButton>
      )}
      <DialogTitle sx={{ textAlign: "center", color: "secondary.main" }}>
        Payment Details
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body2"
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
        >
          {payload?.categoryType?.voucherType}
          {["bus", "stadium", "cinema"].includes(payload?.category)
            ? ` TICKET`
            : ` VOUCHER`}
        </Typography>

        <Stack spacing={1} paddingY={3}>
          <VoucherPlaceHolderItem
            title="Price"
            value={currencyFormatter(payload?.categoryType?.price)}
          />
          <VoucherPlaceHolderItem title="Quantity" value={payload?.quantity} />
          <VoucherPlaceHolderItem
            title="Total"
            value={currencyFormatter(payload?.totalAmount)}
          />
          <Avatar
            src={payload.serviceProviderImage}
            variant="square"
            sx={{ width: 80, height: 40, marginY: 4, alignSelf: "center" }}
          />

          {payload?.fullName && (
            <VoucherPlaceHolderItem title="Name" value={payload?.fullName} />
          )}
          <VoucherPlaceHolderItem title="Email" value={payload?.email} />
          <VoucherPlaceHolderItem
            title="Phone Number"
            value={payload?.phoneNumber}
          />
        </Stack>
        <LoadingButton
          variant="contained"
          onClick={handlePayment}
          fullWidth
          loading={loading}
          loadingPosition="end"
          endIcon={<MoneyRounded />}
        >
          {loading ? "Please Wait..." : " Proceed to pay"}
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(VoucherPaymentDetails);
