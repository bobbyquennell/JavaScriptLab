/**
 * Created by LogicPlatypus on 22/12/2014.
 */
window.onload=getlocation;
function getlocation(position){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(handleLocationInfo);
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
}