(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const apiKey = "AIzaSyDqy2VufPKRzJNVvGMk5d2-VOXTekvxj94";
const spotifyApi = "BQAqMZJtI_JKjwKGRJ07F8y7aF-ji7GYKHLD1TDSp6WyeVoSdmFs1o-mbSMr9RRdL6I2W7l_A1-R2DRJqVzL_xfhcCjtEgCIt3eaZOov7L8O1of9pN5-x18B4HVcARwL4enK3EYyGjBu1m6XwdimiV0Fpukv2wZnyCmTcAYXq9bEyDgCRduZseNlkVAFcudU6ip_tGgVLK-ICmKZswJKaEWhBspZhzhDALsyCCCwXIk";
},{}],2:[function(require,module,exports){
const env = require("./env");
const script = require("./script");

setTimeout(script(), 4000);


},{"./env":1,"./script":3}],3:[function(require,module,exports){
var port = chrome.runtime.connect();
const spotifyApi = require("./env").spotifyApi;
const apiKey = require("./env").apiKey;


function addButton() {
    var newBtn = document.createElement("button")
    newBtn.innerHTML = "Add to spotify"
    newBtn.addEventListener("onClick", () => saveIt())

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
    getSongName().then(songName => {
        getSongId(songName).then(songId => {
            saveToLiked(songId).then(saved => console.log("Saved!"))
        })
    })
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

module.exports = addButton();
},{"./env":1}]},{},[2]);
