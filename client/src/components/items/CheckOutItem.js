import { Box, Typography } from "@mui/material";


const CheckOutItem = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography color="primary" variant="body2" sx={{ fontWeight: "700" }}>
        {title}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
};

export default CheckOutItem;
