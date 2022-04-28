import * as React from 'react';
import FuncHeader from '../FuncHeader';
import { Box } from '@mui/material';
import LendInput from './LendInput';


export default function Lend(){
    
    return (
        <Box sx={{width:"100%"}}>
            <FuncHeader func="Check Out" />
            <LendInput />
        </Box>
    )
}