//首页布局
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import DrawerLeft from '../../components/Left/DrawerLeft';
import LeftTabs from '../../components/Left/LeftTabs';
import Header from '../../components/Header';
import Content from '../../components/Content';

import '../../components/style.css'
import axios from 'axios';
import {loginUser} from '../../utils/cookie'
const URL = 'http://localhost:8080';
//props 传入用户权限
export default function Home(props) {
  //路由跳转对象
  const navigate = useNavigate();

  if(!loginUser()){
    alert('Plz Login first!');
    navigate("/welcome");
  }
  // const [finesDia, setFinesDia] = useState({
  //   open: false,
  //   fines: 0
  // });
  // useEffect(()=>{  //初始化的时候获取该用户罚款金额
  //   const fetchFines = async ()=>{
  //     const res = await axios.get(URL+"/preReturnBook?userId="+loginUser())
  //     if(res.data !== 0){  //如果有罚款的话，弹出窗口
  //       setFinesDia({
  //         open: true,
  //         fines: res.data
  //       })
  //     }
  //   }
  //   fetchFines();
  // },[])
  // const handleDiaClose = ()=>{
  //   setFinesDia({...finesDia, open: false})
  // }
  // const gotoPay = ()=>{
  //   window.location.href=`${URL}/pay?userId=${loginUser()}`;
  // }
    
    //当前选择的功能
    const [func, setFunc] = useState(props.privilege === 'user'? "Search": "Add");

    //获取子组件当前选择的功能
    const getFunc = (newFunc) =>{
      setFunc(newFunc);
    }

  return (
    <React.Fragment>
      {/* <Dialog open={finesDia.open} onClose={handleDiaClose}>
        <Box sx={{ width: "500px" }}>
          <DialogTitle>You Have Unpaid Fines</DialogTitle>
          <DialogContent>
            You must to pay {finesDia.fines}￥ 
          </DialogContent>
          <DialogActions>
            <Button variant="contained"
              onClick={gotoPay}
            >Pay</Button>
          </DialogActions>
        </Box>
      </Dialog> */}
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
          <LeftTabs privilege={props.privilege} getFunc={getFunc}/>
      </DrawerLeft>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Content func={func}/>
      </Box>
    </Box>
    </React.Fragment>
  );
}