/**
 * Created by LogicPlatypus on 22/12/2014.
 */
window.onload=initLocationService;
var marker = null;
var map = null;
var watchid = null;
var infowindow = null;
var positionOptions = {
    enableHighAccuracy: true,
    timeout:9000,
    maximumAge:0
};
var updateStep = 5;
var preCoords = null;
function initLocationService(){

    if(navigator.geolocation)
    {
        //navigator.geolocation.getCurrentPosition(handleLocationInfo,errorhandler,positionOptions);
        var startTrack = document.getElementById("trackPosition");
        var stopTrack = document.getElementById("clearWatch");
        startTrack.onclick = startWatch;
        stopTrack.onclick = clearWatch;
    }
    else{
        alert("Woops, we don't provide location service");
    }
}


/////// track position with geo API///////
function startWatch(){
    watchid = navigator.geolocation.watchPosition(handleLocationInfo,errorhandler,positionOptions);
}
function reportNewPosition(latestCoords){
    marker.position = latestCoords;
}
function clearWatch(){
    if(watchid){
    navigator.geolocation.clearWatch(watchid);
    watchid = null;}
}
function createGMap(coords){
    //display google map here with default position and options;
    var latitude = coords.latitude;
    var longitude= coords.longitude;
    var gLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: gLatlng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    if(map == null) {
        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
    }
}
function addGMarker(coords,titleString, infoContent){
    //add a new marker in map
    var latitude = coords.latitude;
    var longitude= coords.longitude;
    var myLatlng = new  google.maps.LatLng(latitude, longitude);
    var markerOptions = {
        position: myLatlng,
        map:map,
        title: titleString,
        clickable:true
    };
    marker = new google.maps.Marker(markerOptions);
    //enableInfoWindow(map,marker,content);
    var infoWindowOptions = {
        content:infoContent
        //position:myLatlng
        //maxWidth:100
    };
    infowindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}
function removeGMarker(marker){marker.setMap(null);}

function handleLocationInfo(position){

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var myLatlng = new  google.maps.LatLng(latitude, longitude);
    var div = document.getElementById("location");
    div.innerHTML = "your location is: latitude " + latitude + " longitude: " + longitude;
    div.innerHTML += " with " + position.coords.accuracy + " meters accuracy.";
    var km = computeDistance(position.coords, homeCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from " + homeCoords.PlaceName;
    if(map == null){
        createGMap(position.coords);
        var content = "You are at Latitude: " + latitude + " longitude: " + longitude;
        var content2 = "You are here: " + latitude +  ", " +longitude;
        addGMarker(position.coords,"Your Location",content);
        preCoords = position.coords;
    }
    else{
        var distanceMeter = computeDistance(preCoords,position.coords);
        distanceMeter *=1000;
        var debuginfor = document.getElementById("debuginfo");
        debuginfor.innerHTML = "moved " + distanceMeter + " meters<br>";
        if(distanceMeter > updateStep)
        {   debuginfor.innerHTML += "will add a new marker";
            var content = "You are at Latitude: " + latitude + " longitude: " + longitude;
            var content2 = "You are here: " + latitude +  ", " +longitude;
            addGMarker(position.coords,"Your Location",content);
/*            google.maps.event.addListener(map, 'center_changed', function() {
                // 3 seconds after the center of the map has changed, pan back to the
                // marker.
                window.setTimeout(function() {
                    map.panTo(marker.getPosition());
                }, 3000);
            })*/
            map.panTo(myLatlng);
            preCoords = position.coords;
        }
        else{debuginfor.innerHTML += "moving distance less than " + updateStep +" meter, no marker added";}
    }
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

var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';
function enableInfoWindow(map,marker,contentString){
    infowindow = new google.maps.InfoWindow({
        content: contentString,
        position:marker.position
        //maxWidth: 200
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
    //google.maps.event.addDomListener(window, 'load', initialize);
}

