import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function UserTabs(props) {
  const [value, setValue] = React.useState(0);
  const funcArr = ['Reservations', 'Borrowed', 'Search'];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.getFunc(funcArr[value]);
  };

  return (
    <Box sx={{ width: '100%', mt:"40%", bgcolor: 'background.paper' }}>
      <Tabs 
      value={value} 
      onChange={handleChange} 
      orientation="vertical"
      >
        <Tab label="Find Books" />
        <Tab label="My Reservations" />
        <Tab label="My Borrowed Items" />
      </Tabs>
    </Box>
  );
}