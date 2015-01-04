/**
 * Created by LogicPlatypus on 4/01/2015.
 */
onmessage = pingPong;
function pingPong(event){
    if(event.data == "ping"){
        postMessage("pong");
    }
}