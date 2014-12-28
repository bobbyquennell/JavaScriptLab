/**
 * Created by LogicPlatypus on 28/12/2014.
 */
window.onload = videoInit;
var playIndex = 0;
var videoObj = null;
// play list array
// when window onload,  load the first video, register a ended handler
//when video.ended, play next video in the play list array
var playList = [{name:"preroll",src:"video/preroll.mp4", durationInSeconds:20},
    {name:"areyoupopular",src:"video/areyoupopular.mp4", durationInSeconds:200},
    {name:"destinationearth",src:"video/destinationearth.mp4", durationInSeconds:200}
]

function videoInit(){
    videoObj = document.getElementById("video");
    playVideo(playIndex);
    //videoObj.ended = endedHandler; note: Cannot add endedHandler in this way!!!!!!
    videoObj.addEventListener("ended", endedHandler, false);
}
function endedHandler(){
    playIndex += 1;
    if(playIndex > 2){
        playIndex = 0;
    }
    playVideo(playIndex);
}
function playVideo(playIndex){
    videoObj.src = playList[playIndex].src;
    videoObj.load();
    videoObj.play();
}


