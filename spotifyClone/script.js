console.log("Welcome to Spotify");

//Initialize the variables
let songIndex= 0;
let audioElement= new Audio('song/Ed Sheeran-Perfect.mp3');
let songItemPlay= document.getElementById('songItemPlay');
let masterSongName= document.getElementById('masterSongName');
let myProgressBar= document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: 'Perfect-Ed Sheeran', filePath:"song/Ed Sheeran-Perfect.mp3", coverPath: "./photos/Perfect.png"},
    {songName: 'Shape of You-Ed Sheeran', filePath:"song/Ed Sheeran-Shape Of You.mp3", coverPath: "./photos/ShapeofYou.png"},
    {songName: 'Gasolina-Daddy Yankee', filePath:"song/Gasolina.mp3", coverPath: "./photos/Gasolina.png"},
    {songName: 'Despacito-Luis Fonsi and Daddy Yankee', filePath:"song/Despacito.mp3", coverPath: "./photos/Despacito.png"},
    {songName: 'Sawaar Loon-Lootera', filePath:"song/Sawaar Loon Lootera.mp3", coverPath: "./photos/SawaarLoon.png"},
]

songItems.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();
// Handle play/pause click
songItemPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        songItemPlay.classList.remove('fa-play-circle');
        songItemPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        songItemPlay.classList.remove('fa-pause-circle');
        songItemPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/ audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value= progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        // console.log(e.target);
        songIndex= parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime =0;
        audioElement.play();
        gif.style.opacity = 1;
        songItemPlay.classList.remove('fa-play-circle');
        songItemPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('previous').addEventListener('click', ()=>{
if(songIndex<=0){
    songIndex=0;
}
else{
     songIndex-=1;
}
audioElement.src = `song/${songIndex}.mp3`;
masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
gif.style.opacity = 1;
songItemPlay.classList.remove('fa-play-circle');
songItemPlay.classList.add('fa-pause-circle');
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity = 1;
    songItemPlay.classList.remove('fa-play-circle');
    songItemPlay.classList.add('fa-pause-circle');
    })
