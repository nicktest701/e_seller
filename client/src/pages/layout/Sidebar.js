import React, { useContext, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { Divider, IconButton, List, ListSubheader, Stack } from "@mui/material";
import PropTypes from "prop-types";
import Close from "@mui/icons-material/Close";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import NavLinkItem from "../../components/NavLinkItem";
import NavLinkItemCollapse from "../../components/modals/NavLinkItemCollapse";
import { CustomContext } from "../../context/providers/CustomProvider";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const { customState, customDispatch } = useContext(CustomContext);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      customDispatch({
        type: "openSidebar",
        payload: false,
      });
    }
  }, [location, customDispatch]);

  const handleClose = () => {
    customDispatch({
      type: "openSidebar",
      payload: false,
    });
  };
  return (
    <Drawer
      anchor="left"
      open={customState.openSidebar}
      onClose={handleClose}
      // variant={{ xs: "persistent", md: "permanent" }}
    >
      <Stack role="presentation" width="280px" spacing={2} paddingY={2}>
        <IconButton
          edge="end"
          onClick={handleClose}
          sx={{ alignSelf: "flex-end", marginRight: 2 }}
        >
          <Close />
        </IconButton>

        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Shop
            </ListSubheader>
          }
        >
          <NavLinkItem to="/" title="Dashboard" icon={<GasMeterIcon />} />
          <Divider />
          <NavLinkItem
            to="evoucher"
            title="E-Voucher"
            icon={<GasMeterIcon />}
          />
          <Divider />
          <NavLinkItemCollapse />
          <Divider />

          <NavLinkItem
            to="prepaid"
            title="Prepaid Units"
            icon={<GasMeterIcon />}
          />
          <NavLinkItem
            to="airtime"
            title=" Bulk Transfers"
            icon={<GasMeterIcon />}
          />

          <Divider />
        </List>
      </Stack>
    </Drawer>
  );
}

export default Sidebar;

Sidebar.proptype = {
  openSidebar: PropTypes.bool,
  setOpenSidebar: PropTypes.func,
};
