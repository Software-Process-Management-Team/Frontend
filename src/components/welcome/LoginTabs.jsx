import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Signin from './Signin';
import AdminLogin from './AdminLogin';
import '../style.css';

export default function LoginTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function Form(props){
    if(props.value === 0){
      return <Signin/>
    }
    else{
      return <AdminLogin/>
    }
  }

  return (
      <Box sx={{ width: '100%', marginTop:'10px' }} className='center'>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Member" />
          <Tab label="Librarian" />
        </Tabs>
        <Form value={value} />
      </Box>
  );
}