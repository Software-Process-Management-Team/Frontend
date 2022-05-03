//首页布局
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import DrawerLeft from '../../components/Left/DrawerLeft';
import LeftTabs from '../../components/Left/LeftTabs';
import Header from '../../components/Header';
import Content from '../../components/Content';

import '../../components/style.css'
import {loginUser} from '../../utils/cookie'

//props 传入用户权限
export default function Home(props) {
  //路由跳转对象
  const navigate = useNavigate();

  if(!loginUser()){
    alert('Plz Login first!');
    window.location.href= "http://169.254.70.132:3000/";
  }
    
    //当前选择的功能
    const [func, setFunc] = useState(props.privilege === 'user'? "Search": "Add");

    //获取子组件当前选择的功能
    const getFunc = (newFunc) =>{
      setFunc(newFunc);
    }

  return (
    <React.Fragment>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header 
        id={loginUser()}
        privilege={props.privilege}
        />
      </AppBar>
      <DrawerLeft >
          <LeftTabs privilege={props.privilege} getFunc={getFunc} uid={loginUser()}/>
      </DrawerLeft>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Content func={func}/>
      </Box>
    </Box>
    </React.Fragment>
  );
}