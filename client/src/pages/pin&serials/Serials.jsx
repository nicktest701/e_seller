import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

function Serial({
  isSerialChecked,
  setIsSerialChecked,
  serialNumber,
  setSerialNumber,
  serialLength,
  setSerialLength,
  serialOption,
  setSerialOption,
}) {
  return (
    <Stack flex={1} spacing={2}>
      <FormControlLabel
        label="Serials"
        control={
          <Checkbox
            checked={isSerialChecked}
            onChange={(e) => setIsSerialChecked(!isSerialChecked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />

      {isSerialChecked && (
        <>
          <TextField
            label="Number of Serials"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
          <TextField
            label="Length"
            value={serialLength}
            onChange={(e) => setSerialLength(e.target.value)}
          />
          <FormControl>
            <FormLabel id="serials">Options</FormLabel>
            <RadioGroup
              row
              aria-labelledby="serials"
              name="serials-group"
              value={serialOption}
              onChange={(e) => setSerialOption(e.target.value)}
            >
              <FormControlLabel
                value="letters"
                control={<Radio />}
                label="Letters only"
              />
              <FormControlLabel
                value="numbers"
                control={<Radio />}
                label="Numbers only"
              />
              <FormControlLabel value="both" control={<Radio />} label="Both" />
            </RadioGroup>
          </FormControl>
        </>
      )}
    </Stack>
  );
}

export default Serial;
