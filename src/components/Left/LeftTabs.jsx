//为了防止重新render就单独封装起来
import * as React from 'react';
import UserTabs from "./UserTabs";
import AdminTabs from "./AdminTabs";

export default function LeftTabs(props){
    if(props.privilege === 'user'){
        return <UserTabs getFunc={props.getFunc}/>
    }
    else{
        return <AdminTabs getFunc={props.getFunc}/>
    }
}