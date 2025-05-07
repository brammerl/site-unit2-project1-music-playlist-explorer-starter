
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


            response.playlists.forEach((playlist) => {
                const {playlist_name, playlist_creator, playlist_art, likeCount, playlistID}  = playlist;

                const playlistCard = document.createElement('div')

                playlistCard.classList.add('playlist-card')
                playlistCard.setAttribute('playlist-id', playlistID.toString());

                playlistCard.innerHTML = `
                <img src=${playlist_art}/>
                <div class="playlist-card-info">
                    <h2>${playlist_name}</h2>
                    <p>Created by: ${playlist_creator}</p>
                </div>
                <div class="favorite">
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="heart">
                        <rect width="24" height="24" fill="none"/>
                        <path d="M21 8.99998C21 12.7539 15.7156 17.9757 12.5857 20.5327C12.2416 20.8137 11.7516 20.8225 11.399 20.5523C8.26723 18.1523 3 13.1225 3 8.99998C3 2.00001 12 2.00002 12 8C12 2.00001 21 1.99999 21 8.99998Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <p> ${likeCount} </p>
                `
                playlistCards.appendChild(playlistCard)
            })
        })
        .then(() => addClickEvent())
        .catch((error) => {

        })

        
})

const addClickEvent = () => {
    const cards = document.querySelectorAll('.playlist-card')
    console.log(cards)

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const overlay = document.querySelector('.modal-overlay')
            overlay.classList.add('active')
            document.body.style.overflow = 'hidden';
        })
    })
}