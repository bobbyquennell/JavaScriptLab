/**
 * Created by LogicPlatypus on 31/12/2014.
 */
window.onload = stickiesInit;
var stickyKey = "sticky";
var stickCount = 0;
function stickiesInit(){
    var button = document.getElementById("sticky");
    button.onclick = stickIt;
    loadStickies();
    //load all the stickies and display it
}
function stickIt() {
    //setItem(sticky_0, Text.input);
    var key = stickyKey + "_" + stickCount;
    stickCount += 1;
    var textObj = document.getElementById("text");
    var text = textObj.value;
    localStorage.setItem(key, text);
    drawSticky(key, text);
    //create a canvas to display the sticky
}
function drawSticky(stickyId,text){
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width","210px");
    canvas.setAttribute("height","250px");
    canvas.setAttribute("id",stickyId);
    var ctx = canvas.getContext("2d");
    ctx.font = "2em Lucida Grande serif";
    ctx.fillText(text,20,50);
    ctx.textAlign = "left";
    var div = document.getElementById("stickies");
    div.appendChild(canvas);
}
function loadStickies(){
    //foreach the localStorage to display all stickies
    var index = 0;
    var key = "sticky_" + index;
    for(index = 0; index < localStorage.length; index++){
        var key = "sticky_" + index;
        //var text = localStorage["key"];
        var text = localStorage.getItem(key);
        if(text != null){
            drawSticky(key,text);
            stickCount += 1;
        }
    }

}