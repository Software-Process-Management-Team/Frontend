import cookie from "react-cookies";
export const loginUser = () =>{
    return cookie.load('cookieUserName');
}
export const onLogin = (user) =>{
    cookie.save('cookieUserName', user, {path:'/'})
}
export const logout = ()=>{
    cookie.remove('cookieUserName')
    window.location.href = '/welcome'
}