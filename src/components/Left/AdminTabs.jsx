import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function AdminTabs(props) {
  const [value, setValue] = React.useState(0);
  const funcArr = ["Add", "Delete", "Return", "lend", "Regis"];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.getFunc(funcArr[newValue]);
  };

  return (
    <Box sx={{ width: '100%', mt:"40%", bgcolor: 'background.paper' }}>
      <Tabs 
      value={value} 
      onChange={handleChange} 
      orientation="vertical"
      >
        <Tab label="Add Books" />
        <Tab label="Delete Books" />
        <Tab label="Returns" />
        <Tab label="Check Out" />
        <Tab label="Registration" />
      </Tabs>
    </Box>
  );
}