import React, { useState, useContext } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";

import { NavLink, useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants";
import Sidebar from "./Sidebar";
import { CustomContext } from "../../context/providers/CustomProvider";
import GlobalAlert from "../../components/alert/GlobalAlert";

function Header() {
  const { customState, customDispatch } = useContext(CustomContext);

  const [shadow, setShadow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  window.onscroll = function (e) {
    if (window.scrollY > 5) {
      setShadow({
        boxShadow: `2px 3px 5px rgba(0,0,0,0.2)`,
      });
    } else {
      setShadow(null);
    }
  };

  const goHome = () => {
    navigate("/", { replace: true });
  };

  const myLinkStyles = ({ isActive }) => {
    return {
      textDecoration: "none",
      borderBottom: isActive ? "solid 2px green" : null,
      color: "#333",
    };
  };

  // console.log(customState);
  return (
    <header style={{ zIndex: 20, ...shadow }}>
      <AppBar elevation={0} sx={{ justifyContent: "center" }} color="inherit">
        {/* {customState.alertData.message && <GlobalAlert />} */}
        <Toolbar>
          <IconButton
            edge="start"
            size="large"
            color="inherit"
            onClick={goHome}
          >
            <Avatar src={IMAGES.coat_of_arms} width={24} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={goHome}
          >
            Frebby Tech Consults
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
            }}
          >
            <Button color="primary">
              <NavLink to="prepaid" style={myLinkStyles}>
                Menu
              </NavLink>
            </Button>
            <Button
              color="primary"
              sx={{
                "&:hover": {
                  borderBottom: "solid 2px green",
                },
              }}
            >
              <NavLink to="evoucher" style={myLinkStyles}>
                E-Voucher &#38; pincodes
              </NavLink>
            </Button>

            <Button color="primary">
              <NavLink to="prepaid" style={myLinkStyles}>
                Prepaid units
              </NavLink>
            </Button>
            <Button color="primary">
              <NavLink to="airtime" style={myLinkStyles}>
                Bulk airtime
              </NavLink>
            </Button>
          </Stack>
          <Stack direction="row" sx={{ display: { xs: "none", lg: "flex" } }}>
            <Button
              color="inherit"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Avatar />
            </Button>
            <Button variant="text" color="inherit">
              Log in
            </Button>
            <Button variant="text" color="inherit">
              Sign up
            </Button>
          </Stack>
          <Menu
            id="account-menu"
            elevation={1}
            MenuListProps={{
              "aria-labelledby": "account-menu",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <Divider />
            <MenuItem>Log Out</MenuItem>
          </Menu>
          <IconButton
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() =>
              customDispatch({ type: "openSidebar", payload: true })
            }
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar />
    </header>
  );
}

export default Header;
