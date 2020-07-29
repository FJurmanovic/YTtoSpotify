var port = chrome.runtime.connect();
const spotifyApi = require("./env").spotifyApi;
const apiKey = require("./env").apiKey;

const state = require("./state");
const auth = require("./auth");

function addButton() {
    var newBtn = document.createElement("button")
    newBtn.innerHTML = "Add to spotify"
    newBtn.addEventListener("click", function(event) {
        console.log("pressed")
        auth();
        console.log(state.token().get());
        getSongName().then(songName => {
            getSongId(songName).then(songId => {
                saveToLiked(songId).then(saved => console.log("Saved!"))
            })
        })
    });

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

    let newName = removeExcess(songName);
    console.log(newName)

    return fetch(`https://api.spotify.com/v1/search?q=${newName}&type=track`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${spotifyApi}`
        }
    }).then(response => response.json())
    .then(data => {
        console.log(data)
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
}

function removeExcess(data) {
    const list = ["(", ")", "[", "]", "Audio", "Official", "Official Video", "Music Video", "Music", "Video", "Explicit", "&"];
    // let newData = data;
    // for(const filter of list) {
    //     const search = new RegExp("")
    //     console.log(filter)
    //     newData.replaceAll(filter, "");
    //     console.log(newData)
    // }

    

    return list.reduce((acc, curr) => {
        return acc.replace(curr, "");
    }, data)
}

module.exports = setTimeout(addButton, 4000);

