
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
            const playlistCards = document.querySelector('.playlist-cards');

            const playlists = response.playlists

            playlists.forEach((playlist) => {
                const {playlist_name, playlist_creator, playlist_art, likeCount, playlistID}  = playlist;

                const playlistCard = document.createElement('div')

                playlistCard.classList.add('playlist-card')
                playlistCard.setAttribute('data-playlist-id', playlistID.toString());

                playlistCard.innerHTML = `
                <img src=${playlist_art}/>
                <div class="playlist-card-info">
                    <h2>${playlist_name}</h2>
                    <p>Created by: ${playlist_creator}</p>
                </div>
                <div class="favorite">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="heart">
                        <rect width="24" height="24" fill="none"/>
                        <path d="M21 8.99998C21 12.7539 15.7156 17.9757 12.5857 20.5327C12.2416 20.8137 11.7516 20.8225 11.399 20.5523C8.26723 18.1523 3 13.1225 3 8.99998C3 2.00001 12 2.00002 12 8C12 2.00001 21 1.99999 21 8.99998Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <p> ${likeCount} </p>
                `
                playlistCards.appendChild(playlistCard)
                addLikeEventListener(playlistID)
            })
            addClickEvent(playlists)
            
        })
        .catch((error) => {
            // TO DO: WRITE SOMETHING HERE PLZ!
        })  
})

// Click event function for playlist tiles
const addClickEvent = (playlists) => {
    const cards = document.querySelectorAll('.playlist-card')

    cards.forEach((card) => {
        const playlistID = card.dataset.playlistId

        card.addEventListener('click', (e) => {
            const heart =  document.querySelector(`[data-playlist-id = "${playlistID}"] .heart path`)
            const overlay = document.querySelector('.modal-overlay')
            const playlist = playlists.filter((playlist) => playlist.playlistID == playlistID)
            populateModal(playlist)
            if(e.target != heart) {
                overlay.classList.add('active')
                document.body.style.overflow = 'hidden';
            }

        })
    })
}

const populateModal = (playlist) => {
    const {playlist_name, playlist_creator, playlist_art, likeCount, songs} = playlist[0]

    const header = document.querySelector('.modal-header')

    header.innerHTML = `
        <img src=${playlist_art}/>
        <div class="playlist-info">
            <h2>${playlist_name}</h2>
            <h3>Created by: ${playlist_creator}</h3>
        </div>
        <div>
            <button> Shuffle </button>
        </div>
    `

    const shuffleButton = document.querySelector('.modal-header button')

    shuffleButton.addEventListener('click', () => {
        songListContainer = document.querySelector('.song-list')

        songListContainer.innerHTML = ''
        const shuffledSongs = shuffleArray(songs)
        populateSongList(shuffledSongs)
    })

    populateSongList(songs)
    addExitClickEvent()
}

const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

const addLikeEventListener = (playlistID) => {
    const heart = document.querySelector(`[data-playlist-id = "${playlistID}"] .heart`)

    heart.addEventListener('click', () => {
        const likeCount =  document.querySelector(`[data-playlist-id = "${playlistID}"] .favorite p`)

        if (heart.classList.contains('clicked') && likeCount.innerHTML > 0 ) { 
            heart.classList.remove('clicked')
            likeCount.innerHTML = `
                ${parseInt(likeCount.innerHTML) - 1} 
            `
            return;
        }

        heart.classList.add('clicked')
        likeCount.innerHTML = `
        ${parseInt(likeCount.innerHTML) + 1} 
    `    
    })

}

export const populateSongList = (songs) => {
    const songListContainer = document.querySelector('.song-list')

    songs.forEach((song) => {
        const {title, artist, album, duration, cover_art} = song

        const songCard = document.createElement('div')
        songCard.classList.add('song-card')
        songCard.innerHTML = `
            <img src=${cover_art}/>
            <div class="song-info">
                <ul>
                    <li><h4>${title}</h4></li>
                    <li>
                        <p>${artist}</p>
                    </li>
                    <li>
                        <p>${album}</p>
                    </li>
                </ul>

            </div>
            <div class="time">
                <p>${duration}</p>
            </div>
        `

        songListContainer.appendChild(songCard)
    })

    addClickEvent()
}


const addExitClickEvent = () => {
    const overlay = document.querySelector('.modal-overlay')

    overlay.addEventListener('click', (e) => {
        if(e.target == overlay) {
            overlay.classList.remove('active')
        }
    })
}

const populateHeader = () => {
    const header = document.querySelector('.modal-header')

    header.innerHTML = `
        <img src="./assets/img/playlist.png"/>
        <div class="playlist-info">
            <h2>Playlist Title</h2>
            <h3>Creator Name</h3>
        </div>
        <div class="exit-button-container">
            <button class="exit-button">X</button>
        </div>
    `
}




