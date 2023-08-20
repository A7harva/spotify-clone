import { ACCESS_TOKEN,EXPIRES_IN, TOKEN_TYPE } from "../common";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const scope = 'user-top-read user-follow-read playlist-read-private user-library-read';
const APP_URL = import.meta.env.VITE_APP_URL;

const authorizeUser = ()=>{
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scope}&show_dialog=true`;
    window.open(url,"login","width=800,height=600");
}

document.addEventListener("DOMContentLoaded", ()=>{
    const loginButton = document.getElementById("login-to-spotify");
    loginButton.addEventListener("click", authorizeUser);
})

window.setItemsInLocalStorage = ({accessToken, tokenType, expiresIn})=>{
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_TYPE, tokenType);
    localStorage.setItem(EXPIRES_IN, expiresIn);
    window.location.href = APP_URL;
}

window.addEventListener("load",()=>{
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if(accessToken){
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
    }

    if(window.opener !== null && !window.opener.closed){
        window.focus();
        
        if(window.location.href.includes("error")){
            window.close();
        }
        
        const {hash} = window.location;
        const searchParams = new URLSearchParams(hash);
        const accessToken = searchParams.get("#access_token");
        
        // #access_token=BQBm0B5ShN4UWvOjln0tQOeCOEPlSWU6EzWbh7I3GCWPVHhFJ2ccjxUy4J7WTdxdDYnys-upFXlhDJJZEpTWfokgyq7evkBYzOnM-oV9Txx4WdzWZuCtK5yR4XKh6Z2_ZDaLytLfLjh1wZbThcLGo2jpeyQ7oSk3tv3hvCjZzSAgAIbg-DpubKiHIWiMhZkFPFmUleAICjJJLAwiW3WJ5nxnxiUtQfJfvQ&token_type=Bearer&expires_in=3600;
        
        const tokenType = searchParams.get("token_type");
        const expiresIn = searchParams.get("expires_in");

        if(accessToken){
            window.close();
            window.opener.setItemsInLocalStorage({accessToken, tokenType, expiresIn});
        }
        else{
            window.close();
        }
    }
})