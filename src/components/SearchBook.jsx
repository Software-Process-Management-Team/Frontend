//搜索书功能
import * as React from 'react';
import { Box } from '@mui/material';
import SearchBox from './SearchBox';
import FuncHeader from './FuncHeader';

export default function SearchBook(){
    return (
        <Box sx={{width:"100%"}}>
            <FuncHeader func="Find Books" />
            <SearchBox />
            {/* booklist */}
        </Box>
    )
}
