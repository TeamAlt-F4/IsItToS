var playlistLength = 7;
var position = 130;
var dots = {
    "circle" : [],
    "data" : []
}
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

dotConstuctor();

let result = document.querySelectorAll('#content > #page-manager');
console.log(result);

function dotConstuctor() {
    for(var i = 0; i < playlistLength; i++) {
        dots.circle[i] = document.createElement('div');
        dots.circle[i].className = 'dot';
        dots.circle[i].setAttribute("id", i);   
        document.body.appendChild(dots.circle[i]);
        var elementStyle = document.getElementById(i).style;
        elementStyle.top = position + 'px';
        position = position + 101;
        //hover();
        dots.circle[i].classList.add('green');  //temp line
    }
}

function setDotColor(dot) {
    if (dot == safeVideo) {
        dot.classList.add('green');
    } else if (dot == restrictedVideo) {
        dot.classList.add('red');
    } else dot.classList.add('yellow');
}

function hover(dot) {
    dots.data.classList.add('hoverData')
    dots.addEventListener('mouseenter', () => dots.data.zIndex = 9)
    dots.addEventListener('mouseleave', () => dots.data.zIndex = 0)
}
