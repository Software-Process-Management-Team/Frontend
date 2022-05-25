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
import PayAlert from '../../components/PayAlert';
import ReturnAlert from '../../components/ReturnAlert';

import '../../components/style.css'
import {loginUser} from '../../utils/cookie'
import axios from 'axios';
const URL = 'http://124.70.53.71:8080';

//props 传入用户权限
export default function Home(props) {
  //路由跳转对象
  const navigate = useNavigate();
  

  if(!loginUser()){
    alert('Plz Login first!');
    window.location.href= "http://localhost:3000/";
  }
  const [payAlert, setPayAlert] = useState({
      open: false,
      payment: 0
    })
    const [returnAlert, setReturnAlert] = useState({
      open: false,
      num: 0
    })

    /* 
    ***初始化数据：欠多少钱、借几本书（参考Myborrowed.jsx的fetchData）
    */

    useEffect(()=>{
      const data = {
        userID: loginUser(),
      }
      const fetchData = async ()=>{
        let res = await axios.get(URL+'/getFineByUserId?userId='+loginUser())
        if(res.data !== 0){
          setPayAlert({
            open: true,
            payment: res.data
          })
        }
        res = await axios.get(URL+'/mycurrentborrow?user_id='+loginUser())
        if(res.data.borrowList.length){
          setReturnAlert({
            open: true,
            num: res.data.borrowList.length
          })
        }
      }
      if(props.privilege === 'user')
        fetchData()
    },[])
  
    
    //当前选择的功能
    const [func, setFunc] = useState(props.privilege === 'user'? "Search": "DashBoard");

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
        {(()=>{
          if(props.privilege === 'user')
            return (
              <React.Fragment>
                <PayAlert payAlert={payAlert}/>
                <ReturnAlert returnAlert={returnAlert}/>
              </React.Fragment>
            )
        })()}
        <Content func={func} privilege={props.privilege}/>
      </Box>
    </Box>
    </React.Fragment>
  );
}