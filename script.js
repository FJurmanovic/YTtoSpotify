var port = chrome.runtime.connect();

setTimeout(addButton, 1000)

function addButton() {
    var newBtn = document.createElement("button")
    newBtn.innerHTML = "Add to spotify"
    newBtn.addEventListener("onClick", saveIt())

    var get = document.getElementById("top-level-buttons")
    console.log(get.appendChild(newBtn))
    console.log(get)
    console.log("It gets here");
}

function getParam(name) {
    // Escape special RegExp characters
    name = name.replace(/[[^$.|?*+(){}\\]/g, '\\$&');
    // Create Regular expression
    var regex = new RegExp("(?:[?&]|^)" + name + "=([^&#]*)");
    // Attempt to get a match
    var results = regex.exec(location.search);
    return decodeURIComponent(results[1].replace(/\+/g, " ")) || '';
}

function getSongName() {
    var songName = '';

    let apiKey = ytApi;
    let id = getParam("v")
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=1&id=${id}&key=${apiKey}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => response.json())
    .then(data => {
        songName = data.items[0].snippet.title;
        return songName
    })
}

function getSongId(songName) {
    var songId = '';

    return fetch(`https://api.spotify.com/v1/search?q=${songName}&type=track`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${spotifyApi}`
        }
    }).then(response => response.json())
    .then(data => {
        songId = data.tracks.items[0].id
        console.log(songId)
        return songId
    })
    
}

function saveToLiked(songId) {
    console.log("Do")
    return fetch(`https://api.spotify.com/v1/me/tracks?ids=${songId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${spotifyApi}`
        }
    }).then(respones => respones.json())
    .then(data => {
        return data
    })
}

function saveIt() {
    getSongName().then(songName => {
        getSongId(songName).then(songId => {
            saveToLiked(songId).then(saved => console.log("Saved!"))
        })
    })
}