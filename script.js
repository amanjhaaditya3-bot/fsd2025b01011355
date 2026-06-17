
let audio = document.getElementById("audio");
let playBtn = document.querySelector(".play-main");
let progress = document.querySelector(".progress-fill");
let progressBar = document.querySelector(".progress");

let currentTimeEl = document.getElementById("currentTime");
let durationEl = document.getElementById("duration");

let volumeControl = document.getElementById("volume");

// ▶ Play / Pause
playBtn.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
});

// 🎵 Format Time
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

// ⏱ Duration set
audio.addEventListener("loadedmetadata", function () {
    durationEl.innerText = formatTime(audio.duration);
});

// 🔄 Update progress + time
audio.addEventListener("timeupdate", function () {
    currentTimeEl.innerText = formatTime(audio.currentTime);

    let percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
});

// ⏩ Seek on click
progressBar.addEventListener("click", function (e) {
    let width = this.clientWidth;
    let clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

// 🔊 Volume control
volumeControl.addEventListener("input", function () {
    audio.volume = this.value;
});

// 🎧 Card click → change song
let cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
    card.addEventListener("click", function () {
        audio.src = "song" + index + ".mp3";
        audio.play();
        playBtn.innerText = "⏸";
    });
});

let songName = document.querySelector(".name");
let artistName = document.querySelector(".artist");

let songs = [
    { name: "Sahiba", artist: "Aditya Rikhari", file: "song0.mp3" },
    { name: "Workout", artist: "Artist 2", file: "song1.mp3" },
    { name: "Bollywood", artist: "Artist 3", file: "song2.mp3" },
    { name: "Indie", artist: "Artist 4", file: "song3.mp3" }
];

cards.forEach((card, index) => {
    card.addEventListener("click", function () {
        audio.src = songs[index].file;
        songName.innerText = songs[index].name;
        artistName.innerText = songs[index].artist;
        audio.play();
        playBtn.innerText = "⏸";
    });
});