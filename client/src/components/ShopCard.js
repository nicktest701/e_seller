import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function ShopCard({ title, img, content, path }) {
  const cardStyles = () => {
    return {
      backgroundColor: "#fff",
      borderRadius: 1,
      justifyContent: "center",
      alignItems: "center",
      borderTop: "solid 2px #083d77",
      padding: 2,
      transition: "all 250ms ease-in-out",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
      "&:hover": {
        transform: "scale(1.04)",
      },
    };
  };
  return (
    <Link to={path} style={{ textDecoration: "none", color: "#333" }}>
      <Stack sx={cardStyles()} spacing={3}>
        <Typography title={title} sx={{ textAlign: "center" }} variant="h6">
          {title}
        </Typography>

        <img
          src={img}
          alt="voucher_logo"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />

        <Typography variant="body2">{content}</Typography>
        <button className="button-link" to={path}>
          Proceed to buy
        </button>
      </Stack>
    </Link>
  );
}

export default ShopCard;
