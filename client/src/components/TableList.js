import { Box, Stack } from "@mui/material";
import React from "react";
import BECETableBody from "./tables/bece/BECETableBody";
import TableHeader from "./tables/bece/TableHeader";

function TableList() {
  return (
    <Box>
      <TableHeader />
      <BECETableBody  />
    </Box>
  );
}

export default TableList;
