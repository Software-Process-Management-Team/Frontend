//首页的头部蓝条
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import User from "./User";
import axios from 'axios';

export default function Header(props){
    return (
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="h6" noWrap component="div">
            Library Manage System
          </Typography>
          <Typography variant="h6" noWrap component="div">
            Welcome! {props.id}
          </Typography>
          <User privilege={props.privilege}/>
        </Toolbar>
    )
}