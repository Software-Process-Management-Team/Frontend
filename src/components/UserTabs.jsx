import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function UserTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt:"40%", bgcolor: 'background.paper' }}>
      <Tabs 
      value={value} 
      onChange={handleChange} 
      orientation="vertical"
      >
        <Tab label="User Tabs" />
        <Tab label="User Tabs" />
        <Tab label="User Tabs" />
      </Tabs>
    </Box>
  );
}