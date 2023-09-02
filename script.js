console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  // { songName: "Enna Sona_Ok Jaanu", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Enna Sona_Ok Jaanu", filePath: "songs/1.mp3" },
  { songName: "Cielo - Huma-Huma", filePath: "songs/1.mp3" },
  { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/1.mp3"},
  { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/1.mp3"},
  { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/1.mp3"},
  { songName: "Rabba - Salam-e-Ishq", filePath: "songs/1.mp3"},
  { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/1.mp3" },
  { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/1.mp3" },
  { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/1.mp3"},
  { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/1.mp3"},
];


songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = "covers/1.jpg";
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

function playSong(index) {
  if (index === songIndex && !audioElement.paused) {
    audioElement.pause();
    songItems[index].querySelector('.songItemPlay').classList.remove('fa-pause-circle');
    songItems[index].querySelector('.songItemPlay').classList.add('fa-play-circle');
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  } else {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    songItems.forEach((songItem, i) => {
      if (i === index) {
        songItem.querySelector('.songItemPlay').classList.remove('fa-play-circle');
        songItem.querySelector('.songItemPlay').classList.add('fa-pause-circle');
      } else {
        songItem.querySelector('.songItemPlay').classList.remove('fa-pause-circle');
        songItem.querySelector('.songItemPlay').classList.add('fa-play-circle');
      }
    });
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  }
}

songItems.forEach((element, index) => {
  element.querySelector('.songItemPlay').addEventListener('click', () => {
    playSong(index);
  });
});

masterPlay.addEventListener('click', () => {
  playSong(songIndex);
  if (!audioElement.paused) {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    // audioElement.src = `songs/${songIndex+1}.mp3`;
audioElement.src = `songs/1.mp3`;
masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime = 0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');

  }
  
});

audioElement.addEventListener('timeupdate', () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  const progress = myProgressBar.value;
  audioElement.currentTime = (progress / 100) * audioElement.duration;
});

audioElement.addEventListener('ended', () => {
  // Play the next song
  const nextSongIndex = (songIndex + 1) % songs.length; // Wrap around to the first song if at the end
  playSong(nextSongIndex);
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
};
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    // audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.src = `songs/1.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    // audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.src = `songs/1.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})