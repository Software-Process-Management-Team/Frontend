import * as React from 'react';
import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function BarCode(props){
    // const bookid = ["12675495", "12346983", "59756813", "68796423", "47595647"];
    const {bookid} = props;
    const getUrl =(id)=>{
        return `http://barcode.tec-it.com/barcode.ashx?data=${id}&code=Code11`;
    }

    return (
    <Box sx={{'& .MuiTextField-root': { m: 1, width: '50%' },
        display:"flex", 
        width:"100%",
        justifyContent:"center"}}>
      <ImageList  cols={4} rowHeight={100} gap={30}>
        {bookid.map((item) => (
          <ImageListItem key={item}>
            <img
              src={getUrl(item)}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    )
}