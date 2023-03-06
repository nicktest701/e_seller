import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "../../constants";

function MatchTicketItem({ id: standId, stand, price }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${standId}/checkout`);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      borderBottom="1px solid #333"
    >
      <Typography>{stand}</Typography>
      <Typography>{currencyFormatter(price)}</Typography>
      <Button variant="contained" size="small" onClick={handleNavigate}>
        Buy
      </Button>
    </Stack>
  );
}

export default MatchTicketItem;
