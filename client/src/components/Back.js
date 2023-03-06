import { ArrowBackRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Back({ to, bg, color }) {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      alignItems="center"
      marginX="auto"
      maxWidth="1000px"
      zIndex="100"
    >
      <IconButton
        sx={{ marginRight: 2, bgcolor: bg || "transparent" }}
        onClick={() => navigate(-1)}
        color={color || "primary"}
      >
        <ArrowBackRounded />
      </IconButton>
    </Box>
  );
}

export default Back;
