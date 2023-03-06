import { Typography, Box } from "@mui/material";

const SubCaption = ({ caption, note }) => {
  return (
    <Box width="100%">
      <Typography variant="h4" sx={{ textAlign: "center", paddingBottom: 1 }}>
        {/* Checker Information */}
        {caption}
      </Typography>
      <Typography
        variant="body2"
        sx={{ paddingBottom: 3, textAlign: "center", color: "#5F6368" }}
      >
        {note}
      </Typography>
    </Box>
  );
};

export default SubCaption;
