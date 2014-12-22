/**
 * Created by LogicPlatypus on 22/12/2014.
 */
window.onload=getlocation;

function getlocation(position){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(handleLocationInfo,errorhandler);
    }
    else{
        alert("Woops, we don't provide location service");
    }
}
function handleLocationInfo(position){

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var div = document.getElementById("location");
    div.innerHTML = "your location is: latitude " + latitude + " longitude: " + longitude;

    var km = computeDistance(position.coords, myCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from the WickedSmart HQ";
}
function errorhandler(error){
    var errorType = {
        0:"Unknown error",
        1:"Permission denied by user",
        2:"Position is not available",
        3:"Request timed out"
    };
    var errorMessage = errorType[error.code];
    if(error.code == 0 || error.code == 2){
        errorMessage += "" + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}