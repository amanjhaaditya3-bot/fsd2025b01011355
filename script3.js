let audio = document.getElementById("audio");
let playBtn = document.querySelector(".play-main");
let progress = document.querySelector(".progress-fill");
let progressBar = document.querySelector(".progress-container");

let currentTimeEl = document.getElementById("currentTime");
let durationEl = document.getElementById("duration");

let volumeControl = document.getElementById("volume");

let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");

// 🎵 Songs list
let songs = ["song0.mp3", "song1.mp3", "song2.mp3"];
let currentSong = 0;

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

// ⏱ Format time
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

// 🎯 Load song
function loadSong(index) {
    audio.src = songs[index];
    audio.play();
    playBtn.innerText = "⏸";
}

// ⏮ Previous
prevBtn.addEventListener("click", function () {
    currentSong--;
    if (currentSong < 0) currentSong = songs.length - 1;
    loadSong(currentSong);
});

// ⏭ Next
nextBtn.addEventListener("click", function () {
    currentSong++;
    if (currentSong >= songs.length) currentSong = 0;
    loadSong(currentSong);
});

// ⏱ Duration
audio.addEventListener("loadedmetadata", function () {
    durationEl.innerText = formatTime(audio.duration);
});

// 🔄 Update time + progress
audio.addEventListener("timeupdate", function () {
    if (audio.duration) {
        currentTimeEl.innerText = formatTime(audio.currentTime);
        let percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + "%";
    }
});

// ⏩ Seek
progressBar.addEventListener("click", function (e) {
    let width = this.clientWidth;
    let clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

// 🔊 Volume
volumeControl.addEventListener("input", function () {
    audio.volume = this.value;
});

// 🔁 Auto next song
audio.addEventListener("ended", function () {
    currentSong++;
    if (currentSong >= songs.length) currentSong = 0;
    loadSong(currentSong);
});