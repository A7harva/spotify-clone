import { fetchRequest } from "../api";
import { endpoint, logout } from "../common";

const onProfileClick = (event) => {
    event.stopPropagation();
    const profileMenu = document.querySelector("#profile-menu");
    profileMenu.classList.toggle("hidden");
    if(!profileMenu.classList.contains("hidden")){
        profileMenu.querySelector("li#logout").addEventListener("click", logout);
    }
}

const loadUserProfile = async () => {
    const defaultImage = document.querySelector("#default-image");
    const profileButton = document.querySelector("#user-profile-btn");
    const displayNmaeElement = document.querySelector("#display-name");

    const {display_name:displayName, images} = await fetchRequest(endpoint.userInfo);

    if(images?.length){
        defaultImage.classList.add("hidden");
    }
    else{
        defaultImage.classList.remove("hidden");
    }

    profileButton.addEventListener("click",onProfileClick);

    displayNmaeElement.textContent = displayName;
}

const onPlaylistItemClicked = (event) => {
    console.log(event.target);
}

const loadFeaturedPlaylist = async() => {
    const {playlists:{items}} = await fetchRequest(endpoint.featuredPlaylist);
    const playlistItemsSection = document.querySelector("#featured-playlist-items");

    for(let {name,description, images, id} of items){
        const playlistItem = document.createElement("section");
        playlistItem.className = "rounded p-4 border-solid border-2 hover:cursor-pointer";
        playlistItem.id = id;
        playlistItem.setAttribute("data-type","playlist");
        playlistItem.addEventListener("click", onPlaylistItemClicked);
        const [{url:imageURL}] = images;
        playlistItem.innerHTML = `<img src="${imageURL}" alt="${name}" class="rounded mb-2 object-contain shadow">
                                <h2 class="text-sm">${name}</h2>
                                <h3 class="text-xs ">${description}</h3>`;
        playlistItemsSection.appendChild(playlistItem);
    }

}

document.addEventListener("DOMContentLoaded", ()=>{
    loadUserProfile();
    loadFeaturedPlaylist();
    document.addEventListener("click", () => {
        const profileMenu = document.querySelector("#profile-menu");
        if(!profileMenu.classList.contains("hidden")){
            profileMenu.classList.add("hidden");
        }
    })
})