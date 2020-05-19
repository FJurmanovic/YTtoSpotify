var port = chrome.runtime.connect();

setTimeout(addButton, 1000)

function addButton(){
    var newBtn = document.createElement("button")
    newBtn.innerHTML = "Add to spotify"

    var get = document.getElementById("top-level-buttons")
    console.log(get.appendChild(newBtn))
    console.log(get)
    console.log("It gets here");
}