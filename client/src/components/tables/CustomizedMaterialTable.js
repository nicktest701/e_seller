import { Container } from "@mui/material";
import MaterialTable from "material-table";
import React from "react";
import { tableIcons } from "../../config/tableIcons";

const CustomizedMaterialTable = ({ title, data, columns }) => {
  const modifiedColumns = columns.map((column) => {
    return { ...column };
  });

  return (
    <Container>
      <MaterialTable
        title={title}
        icons={tableIcons}
        columns={modifiedColumns}
        data={data}
      />
    </Container>
  );
};

export default CustomizedMaterialTable;
