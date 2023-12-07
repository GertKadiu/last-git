import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";


const DateFieldStyled = styled(DateField)({
  ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
    color: "#FFFFFF !important",
  },
  ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-error": {
    color: "#FFFFFF !important",
  },
  ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#666666 ",
    },
  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "12.5px 14px",
  },
  ".css-151wc1o-MuiFormControl-root-MuiTextField-root .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-error":
    {
      color: "#FFFFFF ",
    },
  ".css-1ald77x.Mui-error": {
    color: "#FFFFFF ",
  },
  ".css-1v4ccyo": {
    color: "#FFFFFF ",
  },
  ".css-1x5jdmq": {
    color: "#FFFFFF ",
    padding: "12.5px 14px",
  },
  ".css-1v4ccyo.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#666666 ",
  },
  ".css-1ald77x.Mui-error ": {
    color: "#FFFFFF ",
  },
});

export default function Calendar(props) {

    const disablePastDates = (date) => {
      return date < dayjs().startOf("day");
    };

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateFieldStyled
          label="Calendar"
          ref={props.ref}
          onChange={props.onChange}
          value={props.value}
          shouldDisableDate={disablePastDates}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
