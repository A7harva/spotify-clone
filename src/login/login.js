const client_id = 'a3eec1a9a4e24f63ba4c97691f873caf';
const redirect_uri = 'http://localhost:3000/login/login.html';
const scope = 'user-top-read user-follow-read playlist-read-private user-library-read';
const ACCESS_TOKEN_KEY = "accessToken";
const APP_URL = 'http://localhost:3000';

const authorizeUser = ()=>{
    const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scope}&show_dialog=true`;
    window.open(url,"login","width=800,height=600");
}

document.addEventListener("DOMContentLoaded", ()=>{
    const loginButton = document.getElementById("login-to-spotify");
    loginButton.addEventListener("click", authorizeUser);
})

window.setItemsInLocalStorage = ({accessToken, tokenType, expiresIn})=>{
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("tokenType", tokenType);
    localStorage.setItem("accessToken", expiresIn);
    window.location.href = APP_URL;
}

window.addEventListener("load",()=>{
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
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