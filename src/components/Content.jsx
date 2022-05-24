//内容页布局
import * as React from 'react';
import SearchBook from './Search/SearchBook';
import UserBorrow from './UserBorrow';
import MyBorrowed from './MyBorrowed';
import AddBook from './Admin/AddBook';
import DelBook from './Admin/DelBook';
import Returns from './Admin/Returns';
import Lend from './Admin/Lend';
import Regis from './Admin/Regis';
import BorrowedHisHeader from './History/BorrowedHisHeader';
import DashBoard from './Admin/DashBoard'

import {Provider} from '../utils/pvContext'
import axios from 'axios';

export default function Content(props){
    if(props.func === 'Search'){
        return (
            <Provider value='member'>
                <SearchBook />
            </Provider>
        )
    }
    else if(props.func === "UserBorrow"){
        return <UserBorrow />
    }
    else if(props.func === "Borrowed"){
        return <MyBorrowed />
    }
    else if(props.func === "Add"){
        return <AddBook />
    }
    else if(props.func === "Delete"){
        return <DelBook />
    }
    else if(props.func === "Return"){
        return <Returns/>
    }
    else if(props.func === "lend"){
        return <Lend />
    }
    else if(props.func === "Regis"){
        return <Regis />
    }
    else if(props.func === "History"){
        return <BorrowedHisHeader />
    }
    else if(props.func === 'Update'){
        return (
            <Provider value='librarian'>
                <SearchBook />
            </Provider>
        )
    }
    else if(props.func === "DashBoard"){
        return <DashBoard />
    }
}
