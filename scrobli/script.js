const USER = 'insert_lastfm_username'
const API = 'insert_lastfm_api_key'
const DISPLAY_ID = 'scrobli'

async function updateMusic() {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API}&format=json&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        const latestTrack = data.recenttracks.track[0];
        const song = latestTrack.name;
        const artist = latestTrack.artist['#text']
        const playing = latestTrack["@attr"] && latestTrack['@attr'].nowplaying === 'true';
        const statusSpan = document.getElementById(DISPLAY_ID)

        if (playing) {
            statusSpan.innerText = `is listening to ${song} by ${artist}`
        } else {
            statusSpan.innerText = `last listened to ${song} by ${artist}`
        }
}

updateMusic();
setInterval(updateMusic, 15000);