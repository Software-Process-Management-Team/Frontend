import * as React from 'react';
import FuncHeader from '../FuncHeader';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import {loginUser} from '../../utils/cookie'
import BorrowedHisList from './BorrowedHisList';
import axios from 'axios';
const URL = 'http://124.70.53.71:8080';
export default function BorrowedHisHeader(){
  const [borrowed, setBorrowed] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await axios.get(URL+'/myborrowhistory', {params:{user_id: loginUser()}});
      setBorrowed(res.data.borrowList)
    }
    fetchData()
  }, [])

    return (
      <Box sx={{width:"100%"}}>
        <FuncHeader func="My Borrowed History" />
        {/* booklist */}
        <BorrowedHisList borrowed={borrowed}/>
      </Box>
    )
}