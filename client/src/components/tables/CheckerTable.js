import React, { useContext } from "react";
import MaterialTable from "material-table";
import { CustomContext } from "../../context/providers/CustomProvider";
import { tableIcons } from "../../config/tableIcons";
import _ from "lodash";

const CheckerTable = () => {
  const { customState } = useContext(CustomContext);
  const col = _.uniq(customState.newCheckers?.flatMap(Object.keys));
  const ifColumnExist = (column) =>
    col.some((item) => item === column) ? false : true;
  return (
    <MaterialTable
      title="Voucher Information"
      icons={tableIcons}
      columns={[
        {
          title: "#",
          field: "id",
          hidden: true,
        },
        {
          title: "Serial",
          field: "serial",
          hidden: ifColumnExist("serial"),
        },
        {
          title: "Pin",
          field: "pin",
          hidden: ifColumnExist("pin"),
        },
        {
          title: "Voucher",
          field: "voucher",
        },
      ]}
      data={
        customState.newCheckers === undefined ? [] : customState.newCheckers
      }
      options={{
        search: false,
      }}
    />
  );
};

export default CheckerTable;
