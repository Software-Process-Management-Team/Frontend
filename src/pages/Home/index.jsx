//首页布局
import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import DrawerLeft from '../../components/DrawerLeft';
import Header from '../../components/Header';
import UserTabs from '../../components/UserTabs';
import AdminTabs from '../../components/AdminTabs';

import '../../components/style.css'

//props 传入用户权限
export default function Home(props) {
    const InnerTabs = (props) =>{
        if(props.privilege === 'user'){
          return <UserTabs />
        }
        else{
          return <AdminTabs/>
        }
      }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header />
      </AppBar>
      <DrawerLeft >
          <InnerTabs privilege={props.privilege}/>
      </DrawerLeft>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}