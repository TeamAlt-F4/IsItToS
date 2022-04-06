var playlistLength;
var position = 130;
var dots = {
    "circle" : [],
    "data" : []
}
const vidIDs = [];
/*
const SAFE_VIDEO = "SAFE_STATE";
const QUESTIONABLE_VIDEO = "QUESTIONABLE_STATE";
const UNKNOWN_VIDEO = "UNKNOWN_STATE";
const DANGEROUS_VIDEO = "DANGEROUS_STATE"


//finds the thumbnail on the page and returns the location to add our icon
function getThumbnail() {
    if (document.getElementsById("thumbnail")?.offsetParent === null) {
        return document.querySelector("ytd-menu-thumbnail-content > div");
    }
}

//api request to our server to get data
fetch(
    `https://isittos.gg/videoDatabase?videoId=${getVideoID()}`
)


function addOverlay(){
    //css code and logic to add and overlay
}


function getState() {
    if (isVideoSafe()) {
        return SAFE_VIDEO;
    }
    if (!isVideoSafe()) {
        return DANGEROUS_VIDEO;
    } else {
        return NEUTRAL_STATE;
    }

}

function getVideoID(){
    return videoID;
}

function isVideoSafe(){
    if (current.video == ageRestricted){
        return False;
    } if (current.video == isModRestricted) {
        return False;
    } else {
        return True;
    }
}

function isModRestricted() { //fetch mod data
    if (current.video == modRestricted) {
        return False
    } else return True;

}
*/

window.addEventListener('load', (event) => {
    getVideoIDs();
    dotConstuctor();
    console.log(vidIDs);
    getVideoStatus();
});

function dotConstuctor() {
    for(var i = 0; i < playlistLength; i++) {
        dots.circle[i] = document.createElement('div'); // create dots
        dots.circle[i].className = 'dot';
        dots.circle[i].setAttribute("id", i);   
        document.body.appendChild(dots.circle[i]);
        var elementStyle = document.getElementById(i).style;
        elementStyle.top = position + 'px';
        position = position + 101;
        dots.circle[i].classList.add('green');  //temp line
        
        hover(i);
    }
}

function getVideoIDs() {
    var links = document.querySelectorAll('#video-title');

    for (var i = 0; i < links.length; i++) {
        vidIDs.push(links[i].href.slice(32, 43));
    }
    playlistLength = vidIDs.length;
}

function getVideoStatus() {
    for (var i = 0; i < vidIDs.length; i++) {
        fetch("http://localhost:3000/getStatus/" + vidIDs[i], {mode: 'no-cors'}).then(data => {
            console.log('Success:', data)
        });
    }
}

function setDotColor(dot) {
    if (dot == safeVideo) {
        dot.classList.add('green');
    } else if (dot == restrictedVideo) {
        dot.classList.add('red');
    } else dot.classList.add('yellow');
}

function hover(i) {    
    dots.data[i] = document.createElement('div');
    dots.data[i].className = 'hoverData';
    dots.data[i].setAttribute("id", i + 100);
    dots.circle[i].appendChild(dots.data[i]);
    let dataStyle = document.getElementById(i + 100).style; 
        
    dots.circle[i].addEventListener('mouseenter', () => {
        dataStyle.backgroundColor = 'white';
        dataStyle.color = 'black';
    });
    
    dots.circle[i].addEventListener('mouseleave', () => {
        dataStyle.backgroundColor = 'transparent';
        dataStyle.color = 'transparent';
    });
    
}
