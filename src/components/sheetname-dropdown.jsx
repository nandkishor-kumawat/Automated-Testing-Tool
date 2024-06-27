import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Dropdown({
  data,
  onChange,
  defaultValue,
  label
}) {
  return (
    <Autocomplete
      disablePortal
      defaultValue={defaultValue}
      id="combo-box-demo"
      options={data}
      sx={{ width: 300, py: 0, border: 'none' }}
      renderInput={(params) => <TextField
        {...params}
        label={label}
        sx={{
          py: 0
        }}
      />}
    />
  );
}
