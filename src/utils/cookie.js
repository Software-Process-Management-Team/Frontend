import cookie from "react-cookies";
export const loginUser = () =>{
    return cookie.load('cookieID');
}
export const onLogin = (userID) =>{
    cookie.save('cookieID', userID, {path:'/'})
}
export const logOut = ()=>{
    cookie.remove('cookieID')
    window.location.href = '/welcome'
}