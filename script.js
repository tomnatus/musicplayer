const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music (array of objects)

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight , Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Metric',
        artist: 'Jacinto Design',
    }
    
]

//Check if playing

let isPlaying = false;

// Play

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play' , 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or pause eventListener

playBtn.addEventListener('click' , () => (isPlaying ? pauseSong() : playSong()));

//Update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// on load select song
let songIndex = 0;
loadSong(songs[songIndex]);

// Update Progress Bar en Tijd

function updateProgressBar (e) {
    const {duration , currentTime} = e.srcElement;
    // update progressbar
    let progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calculate duration
    const durationMinutes = Math.floor(duration / 60) ;
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    // avoid not a number fout
    if(durationMinutes) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // calculate currenttime
    const currentMinutes = Math.floor(currentTime / 60) ;
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    
    }

// nextFunction
function nextSong () {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// prevFunction
function prevSong () {
    songIndex--;
    if( songIndex < 0 ) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Set ProgressBar on click

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;


}

// event listeners

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);