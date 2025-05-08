import { populateSongList }  from './script.js';

document.addEventListener('DOMContentLoaded', () => {
    fetch('/data/data.json', {
        method: "GET"
    })
        .then((response) => {
            if(!response) {
                throw Error(`HTTP Error: ${response.status}`)
            }

            return response.json()
        })
        .then((response) => {
            const playlists = response.playlists

            const randPlaylist =  playlists[Math.floor(Math.random() * playlists.length)];

            const {playlist_art, playlist_name, songs} = randPlaylist

            const container = document.querySelector('.featured-container')

            const infoContainer = document.querySelector('.playlist-info-container')

            infoContainer.innerHTML = `
                <img src=${playlist_art}>
                <h1>${playlist_name}</h1>
            `

            populateSongList(songs);
        })
        .catch((error) => {
            // TO DO: WRITE SOMETHING HERE PLZ!
        })  
})
