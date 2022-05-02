import cookie from "react-cookies";

export const onLogin = (userID) =>{
    let d = new Date();
    d.setTime(d.getTime()+24*60*60*60*1000);
    cookie.save('cookieID', userID, {path:'/', expires:d})
}
export const loginUser = () =>{
    return cookie.load('cookieID');
}
export const logOut = ()=>{
    cookie.remove('cookieID')
    // window.location.href = '/welcome'
}