import Add from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MaterialTable, { MTableToolbar } from "material-table";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getVoucherByVoucherType } from "../../api/voucherAPI";
import { tableIcons } from "../../config/tableIcons";
import { voucherTypeColumns, voucherTypeTwoColumns } from "../../mocks/columns";
import LoadChecker from "../modals/LoadChecker";
import { useGetVoucherCategory } from "../../hooks/useGetVoucherCategory";

const LoadVoucher = () => {
  const category = localStorage.getItem("category");

  let modifiedvoucherTypeColumns = voucherTypeColumns.map((column) => {
    return { ...column };
  });

  if (["bus", "cinema", "stadium"].includes(category)) {
    modifiedvoucherTypeColumns = voucherTypeTwoColumns.map((column) => {
      return { ...column };
    });
  }

  const [openLoadChecker, setOpenLoadChecker] = useState(false);
  const [checkerType, setCheckerType] = useState({ id: "", voucherType: "" });

  const handleChangeDatatype = (value) => {
    setCheckerType(value);
    localStorage.setItem("@voucher_type", JSON.stringify(value));
  };
  const { categories } = useGetVoucherCategory(category);

  const dataType = useQuery(
    ["voucher", category, checkerType.id],
    () => getVoucherByVoucherType(checkerType.id),
    {
      enabled: !!category && !!checkerType.id,
    }
  );

  useEffect(() => {
    setCheckerType({ id: "", voucherType: "" });
  }, [category]);

  return (
    <Box
      sx={{
        paddingY: 5,
      }}
    >
      <MaterialTable
        title="Pins & Serials"
        icons={tableIcons}
        components={{
          Toolbar: (props) => {
            return (
              <>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                  paddingY={1}
                >
                  <Autocomplete
                    options={categories}
                    size="small"
                    closeText=" "
                    disableClearable
                    value={checkerType}
                    sx={{ width: 250 }}
                    onChange={(e, value) => handleChangeDatatype(value)}
                    isOptionEqualToValue={(option, value) =>
                      value.id === undefined ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.voucherType || ""}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label=" Voucher Type"
                          size="small"
                          sx={{ minWidth: 320 }}
                          helperText="Select category"
                        />
                      );
                    }}
                  />

                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpenLoadChecker(true)}
                    disabled={checkerType.id === "" ? true : false}
                    size="sm"
                  >
                    Load Checkers
                  </Button>
                </Box>
                <MTableToolbar {...props} />
              </>
            );
          },
        }}
        columns={modifiedvoucherTypeColumns}
        data={dataType.data ?? []}
        options={{
          search: false,
          sorting: true,
          exportButton: true,
          exportAllData: true,
        }}
        style={{
          padding: "10px",
        }}
      />

      <LoadChecker open={openLoadChecker} setOpen={setOpenLoadChecker} />
    </Box>
  );
};

export default LoadVoucher;
