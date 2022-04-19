//内容页布局
import * as React from 'react';
import SearchBook from './SearchBook';
import MyReser from './MyReser';
import MyBorrowed from './MyBorrowed';

export default function Content(props){
    if(props.func === 'Search'){
        return <SearchBook />
    }
    else if(props.func === "Reservations"){
        return <MyReser />
    }
    else if(props.func === "Borrowed"){
        return <MyBorrowed />
    }
    else if(props.func === "Add"){

    }
    else if(props.func === "Delete"){

    }
    else if(props.func === "Return"){

    }
    else {
        
    }
}
