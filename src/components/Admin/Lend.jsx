import * as React from 'react';
import FuncHeader from '../FuncHeader';
import { Box } from '@mui/material';
import CommonInput from './CommonInput';

export default function Lend(){
    
    return (
        <Box sx={{width:"100%"}}>
            <FuncHeader func="Lend Books" />
            <CommonInput func="LEND" />
        </Box>
    )
}