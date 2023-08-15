const CLIENT_ID = "a3eec1a9a4e24f63ba4c97691f873caf";
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";
const REDIRECT_URI = "http://localhost:3000/login/login.html";

const authorizeUser = ()=>{
    const url = 'https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true';
    window.open(url,"login","width=800,height=600");
}

document.addEventListener("DOMContentLoaded", ()=>{
    const loginButton = document.getElementById("login-to-spotify");
    loginButton.addEventListener("click", authorizeUser);

})