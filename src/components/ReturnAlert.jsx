import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {loginUser} from '../utils/cookie'
const URL = 'http://124.70.53.71:8080';


export default function ReturnAlert(props) {
    const {returnAlert} = props
    const [open, setOpen] = React.useState(true)
    if(returnAlert.open===true)
  return (
    <Stack sx={{ width: '100%', mb:'15px' }} spacing={2}>
        <Collapse in={open}>
      <Alert severity="warning"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      >
        You have borrowed {returnAlert.num} books. Please return them as soon as possible!
      </Alert>
      </Collapse>
    </Stack>
  );
  else return null
}