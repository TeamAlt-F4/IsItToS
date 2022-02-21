//Adapted from Return YouTube Dislikes source code https://github.com/Anarios/return-youtube-dislike/blob/main/Extensions/UserScript/Return%20Youtube%20Dislike.user.js

const SAFE_VIDEO = "SAFE_STATE";
const QUESTIONABLE_VIDEO = "QUESTIONABLE_STATE";
const UNKNOWN_VIDEO = "UNKNOWN_STATE";
const DANGEROUS_VIDEO = "DANGEROUS_STATE"

function getThumbnail() {
    if (document.getElementsById("thumbnail")?.offsetParent === null) {
        return document.querySelector("ytd-menu-renderer.ytd-watch-metadata > div");
    } else {
        return document
            .getElementById("menu-container")
            ?.querySelector("#top-level-buttons-computed");
    }
}

//edit function later
function getState() {
    if (isVideoLiked()) {
        return LIKED_STATE;
    }
    if (isVideoDisliked()) {
        return DISLIKED_STATE;
    }
    return NEUTRAL_STATE;
}

function getVideoID(){
    return videoID;
}

function isVideoSafe(){
    if (current.video == ageRestricted){
        return False;
    } else {
        return True;
    }
}