import React from "react";
import { useTheme, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function NavLinkItem({ to, title, icon, type }) {

  const linkStyle = ({ isActive }) => {
    return {
      textDecoration: "none",
      borderBottom: isActive ? "solid 2px green" : null,
      color: "#333",
    };
  };

  const handleNavigate = () => {
    localStorage.setItem("category", type);


  };

  const { palette } = useTheme();

  return (
    <NavLink to={to} style={linkStyle} onClick={() => handleNavigate(to)}>
      <Stack
        direction="row"
        columnGap={3}
        sx={{
          padding: 2,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: palette.grey[300],
          },
        }}
      >
        {icon}
        <Typography variant="body2">{title}</Typography>
      </Stack>
    </NavLink>
  );
}

export default NavLinkItem;
