import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const NestedSelect = () => {
  const [category, setCategory] = useState(null);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          label="Category"
          onChange={handleCategory}
        >
          <MenuItem>category1 </MenuItem>
          <MenuItem>category2</MenuItem>
          <MenuItem>category3 </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default NestedSelect;
