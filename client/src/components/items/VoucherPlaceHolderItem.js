import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function VoucherPlaceHolderItem({ title, value }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography fontWeight="bold">{title}</Typography>
      <Typography variant="body2">{value}</Typography>
    </Stack>
  );
}

export default VoucherPlaceHolderItem;
