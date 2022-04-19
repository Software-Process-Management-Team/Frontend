//首页布局
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import DrawerLeft from '../../components/DrawerLeft';
import Header from '../../components/Header';
import UserTabs from '../../components/UserTabs';
import AdminTabs from '../../components/AdminTabs';
import SearchBox from '../../components/SearchBox';
import FuncHeader from '../../components/FuncHeader';

import '../../components/style.css'
import axios from 'axios';

//props 传入用户权限
export default function Home(props) {
  //路由跳转对象
  const navigate = useNavigate();
  const [id, setId] =  useState('')
  axios.get('http://localhost:8080/getUserByCookie')
  .then(res=>{
    setId(res.data.id)
  }, err=>{
    alert('Plz Login first!');
    navigate("/welcome");
  });
    
    //当前选择的功能
    const [func, setFunc] = useState(props.privilege === 'user'? "Search": "Add");

    const InnerTabs = (props) =>{
      //获取子组件当前选择的功能的函数
      const getFunc = (func) =>{
        console.log(func);
      }
        if(props.privilege === 'user'){
          return <UserTabs getFunc={getFunc}/>
        }
        else{
          return <AdminTabs getFunc={getFunc}/>
        }
      }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header id={id}/>
      </AppBar>
      <DrawerLeft >
          <InnerTabs privilege={props.privilege}/>
      </DrawerLeft>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <FuncHeader func="search books"/>
        <SearchBox/>
      </Box>
    </Box>
  );
}