//搜索书功能
import * as React from 'react';
import { Box } from '@mui/material';
import FuncHeader from '../FuncHeader';
import SearchBox from './SearchBox';
import SearchList from './SearchList';
import axios from 'axios';

export default function SearchBook() {
    const [searchKey, setSearchKey] = React.useState("");
    const getSearchKey = (sk) => {
        setSearchKey(sk);
        console.log("搜索内容：",sk);
        axios.get("http://localhost:8080/searchbook", { params:{info: sk}})
            .then(res => {
                console.log("搜索结果：", res);
            }).catch(err => {
                console.log(err);
            })
        
    }
    return (
        <Box sx={{ width: "100%" }}>
            <FuncHeader func="Find Books" />
            <SearchBox getSearchKey={getSearchKey} />
            <SearchList />
        </Box>
    )
}
