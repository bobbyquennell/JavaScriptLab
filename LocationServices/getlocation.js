/**
 * Created by LogicPlatypus on 22/12/2014.
 */
window.onload=getlocation;
var marker = null;
var map = null;
var watchid = null;
var positionOptions = {
    enableHighAccuracy: false
};
function getlocation(position){

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(handleLocationInfo,errorhandler,positionOptions);
        var startTrack = document.getElementById("trackPosition");
        var stopTrack = document.getElementById("clearWatch");
        startTrack.onclick = startWatch;
        stopTrack.onclick = clearWatch;
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
    div.innerHTML += " with " + position.accuracy + " meters accuracy.";

    var km = computeDistance(position.coords, homeCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from " + homeCoords.PlaceName;
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: myLatlng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    if(map == null) {
        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
    }
     marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
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
/////// track position with geo API///////
function startWatch(){
    watchid = navigator.geolocation.watchPosition(handleLocationInfo);
}
function reportNewPosition(latestCoords){
    marker.position = latestCoords;
}
function clearWatch(){
    if(watchid){
    navigator.geolocation.clearWatch(watchid);
    watchid = null;}
}