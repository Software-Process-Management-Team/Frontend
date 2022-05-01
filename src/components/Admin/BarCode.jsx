import * as React from 'react';
import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function BarCode(props){
    const {bookid} = props;
    const getUrl =(id)=>{
      // 将id添0补齐为8位数
        const ID = id.toString().padStart(8, '0');
        return `http://barcode.tec-it.com/barcode.ashx?data=${ID}&code=Code128`;
    }

    return (
    <Box sx={{'& .MuiTextField-root': { m: 1, width: '50%' },
        display:"flex", 
        width:"100%",
        justifyContent:"center"}}>
      <ImageList  cols={4}>
        {bookid.map((item) => (
          <ImageListItem key={item} sx={{margin:"0 10px"}}>
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