let playlistLength;
let positionY = 179;
let positionX = 469;
let dots = {
    "circle" : [],
    "data" : []
}
const vidIDs = [];
let contentData = [];
let modRatings = [];

window.addEventListener('load', (event) => { // wait for page to load
    getVideoIDs();
    getVideoStatus();
    dotConstuctor();
});

function dotConstuctor() { // constructs full overlay as well as calls other functions
    for(let i = 0; i < playlistLength; i++) {
        dots.circle[i] = document.createElement('div'); // create dots
        dots.circle[i].className = 'dot';
        dots.circle[i].setAttribute("id", i);
        document.body.appendChild(dots.circle[i]); // append dots to body
        let elementStyle = document.getElementById(i).style; // dot assignment to css
        elementStyle.top = positionY + 'px';
        elementStyle.left = positionX + 'px';
        positionY = positionY + 101;

        hover(i);
        setDotColor(i);
    }
}

function getVideoIDs() { // return video ids

    let links = document.querySelectorAll('#video-title');

    for (let i = 0; i < links.length; i++) {
        vidIDs.push(links[i].href.slice(32, 43));
    }
    playlistLength = vidIDs.length;
    console.log(vidIDs)
}


async function getVideoStatus() { // return playlist length and video status
    for (let i = 0; i < vidIDs.length; i++) {
        // Storing response
        const response = await fetch("http://127.0.0.1:3000/getStatus/" + vidIDs[i]);

        // Storing data in form of JSON
        let data = await response.json();

        contentData[i] = data.commentz;
        modRatings[i] = data.moderatorRating;
        setDotColor(i);
        insertData(i);
        

    }console.log(modRatings)
}



function setDotColor(i) { // set dots colors
    if (modRatings[i] == "safe") {
        dots.circle[i].classList.add('green');
    } else {
        dots.circle[i].classList.add('red');
    }
}

function insertData(i) { // insert comments into hover object
    document.getElementById(i + 100).insertAdjacentHTML("afterbegin", contentData[i]);
}

function hover(i) {    // Creates hover item and appends it to dots
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
    dataStyle.color = 'transparent';
}
