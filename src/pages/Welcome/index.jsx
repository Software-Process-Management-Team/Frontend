import React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css'
import LoginTabs from '../../components/welcome/LoginTabs';

//主题
const theme = createTheme();

//Alert封装
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Welcome() {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    className='bg'
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box className='right'>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}/>
                        <Typography component="h1" variant="h4" sx={{mt:3}}>
                            Lib Manage System
                        </Typography>
                        <LoginTabs />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
