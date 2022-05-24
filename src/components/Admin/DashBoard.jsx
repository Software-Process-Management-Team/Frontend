import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchUserDia from './SearchUserDia';
import LndBookDia from './LndBookDia';
import "../style.css"

const theme = createTheme({
    palette:{
        white:{
            main: '#fff'
        }
    }
})
export default function DashBoard() {
    const [userDiaopen, setUserDiaopen] = React.useState(false)
    const [lndDiaopen, setLndDiaopen] = React.useState(false)
    const [lnd, setLnd] = React.useState('')
    const openLost=()=>{
        setLnd('lost')
        setLndDiaopen(true)
    }
    const openDamage = ()=>{
        setLnd('damage')
        setLndDiaopen(true)
    }
    const handleDiaClose = () =>{
        setUserDiaopen(false)
        setLndDiaopen(false);
    }
  return (
    <ThemeProvider theme={theme}>
    <Card className='card' sx={{backgroundColor: '#5A80A5', color:'#fff'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Total Registered Readers
        </Typography>
        <Typography variant="h3" component="div" align='left' >
          10
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='white' onClick={()=>setUserDiaopen(true)}>Learn More</Button>
      </CardActions>
    </Card>
    <Card className='card' sx={{backgroundColor: '#528D9F', color:'#fff'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Total Books
        </Typography>
        <Typography variant="h3" component="div">
          15
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='white' disabled sx={{mt:"-8px"}}>Click allbooks for More info</Button>
      </CardActions>
    </Card>
    <Card className='card' sx={{backgroundColor: '#6FAFCB', color:'#fff'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Total Book Copies
        </Typography>
        <Typography variant="h3" component="div">
          15
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='white' disabled sx={{mt:"-8px"}}>Click allbooks for More info</Button>
      </CardActions>
    </Card>
    <Card className='card' sx={{backgroundColor: '#A6DEEF', color:'#fff'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
          Total Borrows
        </Typography>
        <Typography variant="h3" component="div">
          15
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='white' disabled sx={{mt:"-8px"}}>Click allbooks for More info</Button>
      </CardActions>
    </Card>
    <Card className='card' sx={{backgroundColor: '#397A96', color:'#fff'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
          Total Lost Books
        </Typography>
        <Typography variant="h3" component="div">
          15
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='white' onClick={openLost}>Learn More</Button>
      </CardActions>
    </Card>
    <Card className='card' sx={{backgroundColor: '#3492B6', color:'#fff'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
          Total Damaged Books
        </Typography>
        <Typography variant="h3" component="div">
          15
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='white' onClick={openDamage}>Learn More</Button>
      </CardActions>
    </Card>
    <Card className='card' sx={{backgroundColor: '#95C5DB', color:'#fff'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
        Total Unpaid Fines
        </Typography>
        <Typography variant="h3" component="div">
          15
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='white'>Learn More</Button>
      </CardActions>
    </Card>
    <Card className='card' sx={{backgroundColor: '#6490B5', color:'#fff'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
          Total Fine Collected
        </Typography>
        <Typography variant="h3" component="div">
          15
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='white'>Learn More</Button>
      </CardActions>
    </Card>
    <SearchUserDia open={userDiaopen} handleDiaClose={handleDiaClose}/>
    <LndBookDia open={lndDiaopen} handleDiaClose={handleDiaClose} lnd={lnd}/>
    </ThemeProvider>

  );
}
