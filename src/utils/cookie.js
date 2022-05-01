import cookie from "react-cookies";
import store from "store";
export const loginUser = () =>{
    return cookie.load('cookieID');
}
export const onLogin = (userID) =>{
    cookie.save('cookieID', userID, {path:'/'})
    // store.set("cookieID", userID);
    // store.set("cookieUserName", cookie.load("cookieUserName"))
    // console.log(cookie.load("cookieUserName"));
}
export const logOut = ()=>{
    cookie.remove('cookieID')
    window.location.href = '/welcome'
}