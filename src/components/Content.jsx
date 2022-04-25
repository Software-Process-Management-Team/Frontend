//内容页布局
import * as React from 'react';
import SearchBook from './Search/SearchBook';
import MyBorrowed from './MyBorrowed';
import AddBook from './Admin/AddBook';
import DelBook from './Admin/DelBook';
import Returns from './Admin/Returns';
import Lend from './Admin/Lend';

export default function Content(props){
    if(props.func === 'Search'){
        return <SearchBook />
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
    else {
        return <Lend />
    }
}
