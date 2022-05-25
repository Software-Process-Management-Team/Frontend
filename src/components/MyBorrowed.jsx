import * as React from 'react';
import FuncHeader from './FuncHeader';
import Box from '@mui/material/Box';
import BorrowedList from './BorrowedList';
import { useEffect, useState } from 'react';
import {loginUser} from '../utils/cookie'
import axios from 'axios';
const URL = 'http://124.70.53.71:8080';
export default function MyBorrowed(){
  const [borrowed, setBorrowed] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await axios.get(URL+'/mycurrentborrow', {params:{user_id: loginUser()}});
      setBorrowed(res.data.borrowList)
    }
    fetchData()
  }, [])
    return (
      <Box sx={{width:"100%"}}>
        <FuncHeader func="My Borrowed Items" />
        {/* booklist */}
        <BorrowedList borrowed={borrowed}/>
      </Box>
    )
}