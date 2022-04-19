//内容页布局
import * as React from 'react';
import SearchBook from './SearchBook';

export default function Content(props){
    if(props === 'Search'){
        return <SearchBook />
    }
    else if(props === "Reservations"){
        return 
    }
}
