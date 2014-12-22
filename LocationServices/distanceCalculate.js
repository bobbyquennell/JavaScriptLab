/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
    }
    var SamCoords = {
        latitude: -37.8473,
        longitude: 144.685
    }
    myCoords = {
        latitude: -37.8473,
        longitude: 144.685
    }
    homeCoords = {
        PlaceName:"Sam's House",
        latitude:-37.8473,
        longitude:144.685,
    }
function computeDistance(startCoords, destCoords){
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    
    var Radius = 6371;//radius of the Earth in km.
    var distance = Math.acos(Math.sin(startLatRads)*Math.sin(destLatRads) +
                    Math.cos(startLatRads)*Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads) ) * Radius;
    return distance;

}

function degreesToRadians(degrees){
    var radians = (degrees * Math.PI)/180;
    return radians;
}
