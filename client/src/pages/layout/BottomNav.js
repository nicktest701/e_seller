import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaymentRounded,
  MoneyRounded,
  CardTravel,
  Home,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { isMobile } from "../../config/isMobile";

function BottomNav() {
  const navigate = useNavigate();
  const [bot, setBot] = useState(0);

  const handleNavigate = (path) => navigate(path, { replace: true });

  window.onscroll = function () {
    const rootHeight = document.getElementById("root").scrollHeight;
    const scrollHeight = document.documentElement.clientHeight + window.scrollY;
    if (scrollHeight >= rootHeight - 5) {
      setBot(80);
    } else {
      setBot(0);
    }
  };
  const [value, setValue] = React.useState(0);
  return (
    <Paper
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        bottom:0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          onClick={() => handleNavigate("/")}
        />
        <BottomNavigationAction
          sx={{ whiteSpace: "nowrap" }}
          label="E-Voucher"
          icon={<PaymentRounded onClick={() => handleNavigate("evoucher")} />}
        />
        <BottomNavigationAction
          label="Prepaid Units"
          sx={{ whiteSpace: "nowrap" }}
          icon={<MoneyRounded onClick={() => handleNavigate("prepaid")} />}
        />
        <BottomNavigationAction
          label="Airtime"
          icon={<CardTravel />}
          onClick={() => handleNavigate("airtime")}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
