//首页的头部蓝条
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import User from "./User";

export default function Header(){
    return (
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="h6" noWrap component="div">
            Library Manage System
          </Typography>
          <Typography variant="h6" noWrap component="div">
            Welcome!
          </Typography>
          <User />
        </Toolbar>
    )
}