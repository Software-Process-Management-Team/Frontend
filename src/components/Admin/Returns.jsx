import * as React from 'react';
import FuncHeader from '../FuncHeader';
import { Box } from '@mui/material';
import CommonInput from './CommonInput';

export default function Returns(){
    const [bookid, setBookid] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const getBookid = (id)=>{
        console.log(id);
        
    }

    return (
        <Box sx={{width:"100%"}}>
            <FuncHeader func="Return Books" />
            <CommonInput func="RETURN" getBookid={getBookid}/>
        </Box>
    )
}