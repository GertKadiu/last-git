import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
      backgroundColor: "#1E1D23",
      color: "#FFFFFF",
    },
  },
};

const StyledSelect = styled(Select)({
  "&.MuiSelect-root": {
    color: "white !important",
    height: 28,
    borderColor: "#666666 !important",
  },
});

export default function BasicSelect(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://finally-nu2d.onrender.com")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        sx={{
          width: "100%",
          "& .MuiSelect-root": { borderColor: "#666666 ", color: "#FFFFFF" },
          " .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666666 !important",
            height: 50,
            color: "#FFFFFF",
          },
          ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
            {
              color: "#FFFFFF",
            },
          ".css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
            color: "#FFFFFF",
          },
          ".css-qp5xoa ": {
            color: "#FFFFFF",
          },
          ".css-1njapwh-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root ":
            {
              color: "#FFFFFF",
              borderColor: "#666666 ",
            },
          ".css-11235vm-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root ":
            {
              color: "#FFFFFF",
            },
          ".css-1636szt": {
            color: "#FFFFFF",
          },
          ".css-17xvxwf:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666666 !important",
          },
          ".css-17xvxwf": {
            color: "#FFFFFF",
          },
          ".css-13ctz6f": {
            color: "#FFFFFF",
          },
          ".css-9a61th-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
            {
              color: "#FFFFFF",
            },
          ".css-1v4ccyo": {
            color: "#FFFFFF",
          },
          ".css-ilgse6": {
            color: "#FFFFFF",
          },
        }}
      >
        <InputLabel style={{ color: "#FFFFFF" }} id="demo-simple-select-label">
          Creator
        </InputLabel>
        <StyledSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label="creator"
          onChange={props.onChange}
          MenuProps={MenuProps}
        >
          {users.map((user) => (
            <MenuItem
              sx={{ color: "#FFFFFF", backgroundColor: "transparent" }}
              key={user._id}
              value={user._id}
            >
              {user.name}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Box>
  );
}
