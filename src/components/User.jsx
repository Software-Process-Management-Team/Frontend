//首页右上角用户改密码、登出按钮
//有点太复杂可能需要封装
import * as React from 'react';
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Snackbar } from '@mui/material';
import axios from 'axios';

export default function User() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [Diaopen, setDiaOpen] = React.useState(false);
  const [msg, setMsg] = React.useState({  //提示消息的状态
    open:false,
    message:''
});
  const navigate = useNavigate();
  
  //菜单栏的打开收起
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //修改密码框的打开收起
  const handleDiaOpen = (e) =>{
    setDiaOpen(true);
  }
  const handleDiaClose = () => {
    setDiaOpen(false);
  };
  //提示消息收起
  const handleClose = ()=>{
    setMsg({...msg, open:false})
}

  
  const handleSubmit = (e)=>{
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data={
      password:fd.get('pwd')
    }
    if(data.password !== fd.get("cfpwd")){
      setMsg({
        open:true,
        message:'The entered passwords do not match!'
      })
    }
    else{
      axios.post('/', data)
      .then((res)=>{
        if(res === "success"){
          setMsg({
            open:true,
            message:'Success!'
          })
        }
        else {
          setMsg({
            open:true,
            message:'Failed!'
          })
        }
      })
    }
  }

  const logout = (e) =>{
    //登出请求
    axios.post('http://localhost:8080/logout')
    .then((res)=>{
      navigate('/welcome'); //转到登录页面
    })
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      {/* 点击头像出现的菜单栏 */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleDiaOpen}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Reset Password
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>

      <Dialog open={Diaopen} onClose={handleDiaClose}>
        {/* 提示消息框 */}
      <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={msg.open}
            onClose={handleClose}
            message={msg.message}
        />
        {/* 表单框 */}
        <Box component="form" onSubmit={handleSubmit} >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            name="pwd"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="cfpwd"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="standard"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiaClose}>Cancel</Button>
          <Button variant="contained" type='submit'>Submit</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}