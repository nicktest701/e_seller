import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { cities_regions } from "../../mocks/cities";

const BusSearch = ({ label, value, setValue, icon }) => {
  return (
    <Autocomplete
      options={cities_regions}
      fullWidth
      closeText=" "
      isOptionEqualToValue={(option, value) =>
        value.id === undefined ||
        value.id === null ||
        value.id === "" ||
        option.id === value.id
      }
      getOptionLabel={(option) => `${option.city},${option.region}` || ""}
      value={value}
      onChange={(e, value) => setValue(value)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            placeholder={label}
            fullWidth
            size="medium"
            InputProps={{
              ...params.InputProps,
              sx: {
                borderRadius: 4,
              },

              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end"></InputAdornment>,
            }}
          />
        );
      }}
    />
  );
};

export default BusSearch;
