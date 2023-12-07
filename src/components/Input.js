import * as React from "react";
import TextField from "@mui/material/TextField";

function Input(props) {
  const { initialValue } = props;

  return (
    <div>
      {props.IsUsername && (
        <TextField
          helperText={props.error ? props.errortext : ""}
          errortext={props.errortext}
          type={props.type}
          id={props.id}
          label={props.label}
          onBlur={props.onBlur}
          value={props.value}
          onChange={props.onChange}
          error={props.error}
          defaultValue={initialValue}
          variant={props.variant}
          fullWidth
          autoComplete="off"
          sx={{
            "& .MuiFilledInput-root": {
              border: "1px solid #666666",
              overflow: "hidden",
              backgroundColor: "transparent",
              borderRadius: 1,
              color: "#FFFFFF",
              height: "48px",
              "&.Mui-focused": {
                backgroundColor: "transparent",
                boxShadow: `none`,
                borderColor: " #666666",
                height: "48px",
              },
              "&:hover": {
                backgroundColor: "transparent",
                height: "48px",
                borderColor: " #666666",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            },
          }}
          InputLabelProps={{
            style: { color: "#FFFFFF" },
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
      )}
    </div>
  );
}

export default Input;
