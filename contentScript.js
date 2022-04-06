var playlistLength;
var position = 130;
var dots = {
    "circle" : [],
    "data" : []
}
const vidIDs = [];

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
