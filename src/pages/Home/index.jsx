//首页布局
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import DrawerLeft from '../../components/DrawerLeft';
import LeftTabs from '../../components/LeftTabs';
import Header from '../../components/Header';
import Content from '../../components/Content';

import '../../components/style.css'
import axios from 'axios';
import {loginUser} from '../../utils/cookie'

//props 传入用户权限
export default function Home(props) {
  //路由跳转对象
  const navigate = useNavigate();

  if(!loginUser()){
    alert('Plz Login first!');
    navigate("/welcome");
  }
  const [id, setId] =  useState(loginUser());
  
  const {Provider, Consumer} = React.createContext();
    
    //当前选择的功能
    const [func, setFunc] = useState(props.privilege === 'user'? "Search": "Add");

    //获取子组件当前选择的功能
    const getFunc = (newFunc) =>{
      console.log(newFunc);
      setFunc(newFunc);
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header 
        id={id}
        privilege={props.privilege}
        />
      </AppBar>
      <DrawerLeft >
          <LeftTabs privilege={props.privilege} getFunc={getFunc}/>
      </DrawerLeft>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Content func={func}/>
      </Box>
    </Box>
  );
}