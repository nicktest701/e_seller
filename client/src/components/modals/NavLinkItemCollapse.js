import React, { useState } from "react";
import {
  ListItemButton,
  ListItemIcon,
  Collapse,
  List,
  ListItemText,
} from "@mui/material";

import NavLinkItem from "../NavLinkItem";
import {
  AirplaneTicket,
  CarRentalRounded,
  ExpandLess,
  ExpandMore,
  GasMeter,
  KeySharp,
  NoteRounded,
  ParkRounded,
  SchoolRounded,
  SecurityRounded,
  TheatersRounded,
} from "@mui/icons-material";

function NavLinkItemCollapse({ to, title, icon }) {
  const [open, setOpen] = useState(false);

  const handleCollapse = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleCollapse}>
        <ListItemIcon>
          <AirplaneTicket />
        </ListItemIcon>
        <ListItemText secondary={"Load E-Vouchers"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding sx={{ paddingLeft: 4 }}>
          <NavLinkItem to="/add" title="Home" type="waec" icon={<GasMeter />} />
          <NavLinkItem
            to="/add/generate"
            title="Pins & Serials Generator"
            type="generator"
            icon={<KeySharp />}
          />
          <NavLinkItem
            to="/add/add-waec-checker"
            title="WAEC Checker"
            type="waec"
            icon={<NoteRounded />}
          />
          <NavLinkItem
            to="/add/add-university-forms"
            title="University Forms"
            type="university"
            icon={<SchoolRounded />}
          />
          <NavLinkItem
            to="/add/add-security-service"
            title="Security Service"
            type="security"
            icon={<SecurityRounded />}
          />
          <NavLinkItem
            to="/add/add-cinema-tickets"
            title="Cinema Tickets"
            type="cinema"
            icon={<TheatersRounded />}
          />
          <NavLinkItem
            to="/add/add-stadia-tickets"
            title="Stadium Tickets"
            type="stadium"
            icon={<ParkRounded />}
          />
          <NavLinkItem
            to="/add/add-bus-tickets"
            title="Bus Tickets"
            type="bus"
            icon={<CarRentalRounded />}
          />
        </List>
      </Collapse>
    </>
  );
}

export default NavLinkItemCollapse;
