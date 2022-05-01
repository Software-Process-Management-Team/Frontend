//搜索书功能
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import { Box } from '@mui/material';
import FuncHeader from '../FuncHeader';
import SearchBox from './SearchBox';
import SearchList from './SearchList';
import axios from 'axios';
const URL = 'http://localhost:8080';
export default function SearchBook() {
    const [searchKey, setSearchKey] = React.useState("");
    const [preInfo, setPreInfo] = React.useState([]);
    const navigate = useNavigate();
    React.useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get(URL+"/searchbook")
            if(res.data === "failed"){
                alert("Plz login");
                navigate("/welcome")
            }
            else setPreInfo(res.data);
            
        }
        fetchData();
    }, []);
    const getSearchKey = (sk) => {
        setSearchKey(sk);
        axios.defaults.withCredentials=true;
        axios.get(URL+"/searchbook", {params:{info: sk}})
            .then(res => {
                if(res.data !== 'failed'){
                    setPreInfo(res.data);
                }
            }).catch(err => {
                console.log(err);
            })
        
    }
    return (
        <Box sx={{ width: "100%" }}>
            <FuncHeader func="Find Books" />
            <SearchBox getSearchKey={getSearchKey} />
            <SearchList preInfo={preInfo}/>
        </Box>
    )
}
