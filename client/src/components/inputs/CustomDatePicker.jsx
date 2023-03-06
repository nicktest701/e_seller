import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


export default function CustomDatePicker({ value, setValue, customDateInput }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        value={value}
        minDate={new Date()}
        onChange={(date) => setValue(date)}
        renderInput={customDateInput}
      />
    </LocalizationProvider>
  );
}
