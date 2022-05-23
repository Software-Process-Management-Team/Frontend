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
      const res = await axios.get(URL+'/myborrow', {params:{user_id: loginUser()}});
      setBorrowed(res.data.borrowList)
    }
    fetchData()
  }, [])

  const tempList = [
      {
        bookID: "00000001",
        bookName: "abc",
        borrow_Date: new Date("5/10/2022"),
        return_Date: new Date("5/18/2022")
    },
    {
        bookID: "00000012",
        bookName: "dfh",
        borrow_Date: new Date("5/15/2022"),
        return_Date: new Date("5/21/2022")
    },
    {
        bookID: "00001012",
        bookName: "vnt",
        borrow_Date: new Date("5/15/2022"),
        return_Date: new Date("5/17/2022")
    }
  ]
    return (
      <Box sx={{width:"100%"}}>
        <FuncHeader func="My Borrowed History" />
        {/* booklist */}
        <BorrowedHisList borrowed={tempList}/>
      </Box>
    )
}