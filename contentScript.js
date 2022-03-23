

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

(function () {
    const injectElement = document.createElement('div');
    injectElement.className = 'dot';
    var divArr = document.getElementsByTagName('ytd-playlist-video-renderer');
    //var divArr = document.querySelectorAll('ytd-playlist-video-renderer');
    document.body.appendChild(injectElement);
    console.log(divArr);
})();
