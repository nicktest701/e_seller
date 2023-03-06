import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import Swal from "sweetalert2";
import { CustomContext } from "../../context/providers/CustomProvider";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { tableIcons } from "../../config/tableIcons";
import { allowedColumns } from "../../constants";

function PreviewChecker() {
  const { palette } = useTheme();

  const voucherData = JSON.parse(localStorage.getItem("@voucher_type"));
  const { customState, customDispatch } = useContext(CustomContext);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState({ severity: "", text: "" });

  const checker = customState.loadedChecker;

  useEffect(() => {
    setMsg({ text: "", severity: "" });
    setData([]);

    //auto capitalize data columns
    console.log(checker.meta);
    const capitalizeColumns = _.map(checker.meta, _.upperCase);

    //Check if data columns matches preferred columns
    const itExists = capitalizeColumns.some((column) =>
      allowedColumns.includes(column)
    );
    console.log(itExists);
    console.log(capitalizeColumns);

    if (!itExists) {
      setMsg({
        severity: "error",
        text: "The columns in the selected file does not match with Serials and Pins.Please try renaming your columns or choose an appropriate file",
      });
    } else {
      console.log(checker.data);
      setData(checker.data);
    }
  }, [checker]);

  const handleAddNewCheckers = () => {
    const newData = checker.data.map((data) => {
      return {
        ...data,
        category: voucherData.id,
        voucher: voucherData.voucherType,
      };
    });

    // console.log(newData);

    customDispatch({ type: "newCheckers", payload: newData });
    customDispatch({ type: "openPreviewChecker", payload: false });
  };

  //CLOSE File Dialog
  const handleCloseDialog = () => {
    Swal.fire({
      title: "Exiting",
      text: "Do you want to exit?",
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        customDispatch({ type: "openPreviewChecker", payload: false });
      }
    });
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      fullScreen
      open={customState.openPreviewChecker}
    >
      <DialogActions>
        <Button
          disabled={data?.length === 0 ? true : false}
          variant="contained"
          onClick={handleAddNewCheckers}
        >
          Load Checkers
        </Button>
        <Button onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
      <DialogContent sx={{ padding: 2 }}>
        {msg.text && <Alert severity={msg.severity}>{msg.text}</Alert>}
        <MaterialTable
          title="Serials & Pins Preview"
          icons={tableIcons}
          columns={[
            { title: "ID", field: "id", hidden: true },
            {
              title: "Serial",
              field: "serial",
              hidden: !checker.meta?.includes("serial") ? true : false,
            },
            {
              title: "Pin",
              field: "pin",
              hidden: !checker.meta?.includes("pin") ? true : false,
            },
          ]}
          data={data ?? []}
          options={{
            filtering: false,
            sorting: false,
            selection: false,
            grouping: false,
            search: false,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

PreviewChecker.prototype = {
  isMatch: PropTypes.bool.isRequired,
  setIsMatch: PropTypes.func,
};

export default React.memo(PreviewChecker);
