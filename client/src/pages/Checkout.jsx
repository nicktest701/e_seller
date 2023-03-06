import { useContext, useEffect, useState } from "react";
import ArrowBackIosSharp from "@mui/icons-material/ArrowBackIosSharp";
import Check from "@mui/icons-material/Check";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { sendVoucherMail } from "../api/transactionAPI";

import logo from "../assets/images/coat_of_arms.png";
import success from "../assets/images/success.png";
import CheckOutItem from "../components/items/CheckOutItem";
import { CustomContext } from "../context/providers/CustomProvider";

function Checkout() {
  const navigate = useNavigate();
  const [send, setSend] = useState(true);

  const {
    customState: { transaction },
  } = useContext(CustomContext);

  // console.log(transaction);
  useEffect(() => {
    if (_.isEmpty(transaction)) {
      navigate("/evoucher");
    }
  }, [transaction, navigate]);

  const [loading, setLoading] = useState(true);

  const [previewLoading, setPreviewLoading] = useState(false);

  // Public  vouchers to email
  const sendVoucher = useQuery(
    ["publish-vouchers", transaction?._id],
    () => sendVoucherMail(transaction?._id),
    {
      // enabled: false,
      enabled: !!transaction?._id && !!send,
      onSuccess: (data) => {
        setLoading(false);
        setSend(false);
      },

      onError: (error) => {
        setLoading(false);
      },
    }
  );

  const handlePreviewCheckouts = () => {
    setPreviewLoading(true);
    navigate("/checkout-print", {
      replace: false,
      state: {
        id: transaction?._id,
      },
    });
    setPreviewLoading(false);
  };
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Box
        sx={{
          minHeight: "60px",
          bgcolor: "primary.main",
          padding: 4,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <IconButton edge="start">
          <Avatar src={logo} alt="logo.png" />
        </IconButton>
        <Typography>Frebby Tech Consults</Typography>
      </Box>
      <Container
        sx={{
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            minHeight: 500,
            minWidth: { xs: 350, md: 700 },
            padding: 6,
          }}
        >
          <IconButton href="evoucher">
            <ArrowBackIosSharp />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Payment Succesful</Typography>
            <Avatar src={success} />
          </Box>
          <Divider />

          <Stack spacing={2} paddingTop={6} paddingBottom={4}>
            <CheckOutItem title="Invoice No." value={transaction._id} />
            <CheckOutItem title="Date" value={transaction?.createdAt} />
            <CheckOutItem title="Payment Type." value="Mobile Money" />
            <CheckOutItem title="Agent" value={transaction?.info?.agentName} />
            <CheckOutItem
              title="Mobile No."
              value={transaction?.info?.agentPhoneNumber}
            />
            <CheckOutItem
              title="Email Address"
              value={transaction?.info?.agentEmail}
            />
            <CheckOutItem
              title="Transaction id"
              value={transaction?.info?.transaction_id}
            />
            <Divider flexItem />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            paddingY={2}
          >
            <LoadingButton
              loading={previewLoading}
              variant="contained"
              onClick={handlePreviewCheckouts}
            >
              Preview Voucher
            </LoadingButton>
          </Stack>

          <Stack justifyContent="center">
            <LoadingButton
              loading={loading}
              onClick={sendVoucher.refetch}
              endIcon={sendVoucher.data ? <Check /> : null}
            >
              {sendVoucher.isLoading && "Processing"}
              {sendVoucher.data && "Email Sent"}
              {sendVoucher.isError && "Didn't get Email? Send Again"}
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
      <Box
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          padding: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Copyright &copy; frebbytech Consults || FrebbyTech Consults </p>
      </Box>
    </div>
  );
}

export default Checkout;
