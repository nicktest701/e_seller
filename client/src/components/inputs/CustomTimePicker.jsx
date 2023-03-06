import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import moment from "moment";

export default function CustomTimePicker({ value, setValue, customTimeInput }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimePicker
        value={value}
        minDate={new Date()}
        onChange={(time) => {
          setValue(time);
          console.log(moment(time)?._d);
        }}
        ampm
        renderInput={customTimeInput}
        // renderInput={(params) => (
        //   <TextField size="medium" label="Date" fullWidth {...params} />
        // )}
      />
    </LocalizationProvider>
  );
}
