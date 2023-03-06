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

function Pin({
  isPinChecked,
  setIsPinChecked,
  pinNumber,
  setPinNumber,
  pinLength,
  setPinLength,
  pinOption,
  setPinOption,
}) {
  return (
    <Stack flex={1} spacing={2}>
      <FormControlLabel
        label="Pins"
        control={
          <Checkbox
            checked={isPinChecked}
            onChange={(e) => setIsPinChecked(!isPinChecked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />

      {isPinChecked && (
        <>
          <TextField
            label="Number of Pins"
            value={pinNumber}
            onChange={(e) => setPinNumber(e.target.value)}
          />
          <TextField
            label="Length"
            value={pinLength}
            onChange={(e) => setPinLength(e.target.value)}
          />
          <FormControl>
            <FormLabel id="pins">Options</FormLabel>
            <RadioGroup
              row
              aria-labelledby="pins"
              name="pins-group"
              value={pinOption}
              onChange={(e) => setPinOption(e.target.value)}
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

export default Pin;
