import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function FuncHeader(props){
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Typography variant="h3" component="div" sx={{color:'gray', fontWeight:"300"}}>
              {props.func}
            </Typography>
            <Divider variant="middle"/>
        </Box>
    )
}