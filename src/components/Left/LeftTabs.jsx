//为了防止重新render就单独封装起来
import * as React from 'react';
import UserTabs from "./UserTabs";
import AdminTabs from "./AdminTabs";

export default function LeftTabs(props){
    if(props.privilege === 'user'){
        return (
        <React.Fragment>
          <UserTabs getFunc={props.getFunc}/>
          <img src={"http://barcode.tec-it.com/barcode.ashx?data="+props.uid+"&code=Code128"} width="200" style={{margin:50}}/>
        </React.Fragment>
        )
    }
    else{
        return <AdminTabs getFunc={props.getFunc}/>
    }
}