//搜索书功能
import * as React from 'react';
import { Box } from '@mui/material';
import FuncHeader from '../FuncHeader';
import SearchBox from './SearchBox';
import SearchList from './SearchList';
import axios from 'axios';

export default function SearchBook(){
    const [searchKey, setSearchKey] = React.useState("");
    const getSearchKey = (sk)=>{
        console.log(sk);
        setSearchKey(sk);
    }
    return (
        <Box sx={{width:"100%"}}>
            <FuncHeader func="Find Books" />
            <SearchBox getSearchKey={getSearchKey}/>
            <SearchList />
        </Box>
    )
}
