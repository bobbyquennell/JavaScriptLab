/**
 * Created by LogicPlatypus on 4/01/2015.
 */
window.onload = function(){
    var worker = new Worker("worker.js");
    worker.postMessage("ping");
    worker.onmessage = function(event){
        var message = "Worker says " + event.data;
        var worker = event.target;
        document.getElementById("output").innerHTML = message;
    }

}