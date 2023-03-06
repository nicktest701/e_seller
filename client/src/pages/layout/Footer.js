import { Typography } from "@mui/material";
import React from "react";
import { isMobile } from "../../config/isMobile";
import BottomNav from "./BottomNav";

function Footer() {
  return (
    <>
      <BottomNav />
      {!isMobile() ? (
        <footer>
          <Typography variant="body2">
            Copyright &copy; frebbytech Consults | FrebbyTech Consults
          </Typography>
        </footer>
      ) : null}
    </>
  );
}

export default Footer;
