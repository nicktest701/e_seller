import { Breadcrumbs, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function CustomBreadCrumb({ title, item }) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        gap: 2,
        bgcolor: "secondary.main",
        color: "secondary.contrastText",
      }}
    >
      <Typography>{title}</Typography>

      <Breadcrumbs sx={{ color: "#fff" }}>
        <Link className="breadcrumbs-links" to="/">
          Home
        </Link>
        <Link className="breadcrumbs-links" to="/evoucher">
          E-Voucher
        </Link>
        <Typography variant="body2" sx={{ color: "#fff", fontSize: 12 }}>
          {item}
        </Typography>
      </Breadcrumbs>
    </Container>
  );
}

export default CustomBreadCrumb;
