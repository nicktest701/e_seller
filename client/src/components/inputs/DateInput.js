import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";

export default function DateInput({ value, setValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        value={value}
        minDate={new Date()}
        onChange={(date) => setValue(date)}
        renderInput={(params) => (
          <TextField
            size="medium"
            label="Date"
            fullWidth
            {...params}
            InputProps={{
              ...params.InputProps,
              sx: {
                borderRadius: 4,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
