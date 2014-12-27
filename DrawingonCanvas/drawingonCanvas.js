/**
 * Created by LogicPlatypus on 26/12/2014.
 */
window.onload= drawingInit;
var ctx  =null;
var canvas = null;
function drawingInit(){
    canvas = document.getElementById("painting");
    if(canvas.getContext)
    {
        ctx = canvas.getContext("2d");
    }
    var button = document.getElementById("previewButton");
    button.onclick = drawing;
}
function drawing(){
    var backgrndColorObj = document.getElementById("backgroundColor");
    var ShapeObj = document.getElementById("shape");
    var foregrndColorObj = document.getElementById("foregroundColor");
    var tweetObj = document.getElementById("tweets");
    var index = ShapeObj.selectedIndex;
    var shape = ShapeObj[index].value;
    var backgroundColor = backgrndColorObj[backgrndColorObj.selectedIndex].value;
    fillbackgroundColor(canvas,backgroundColor);
    if(shape == "circles")
    {
        //drawCircles();
        for(var i = 0; i<20; i++){
            drawCircle(ctx);
        }
    }
    else{
        for(var i = 0; i<20; i++) {
            drawSquares();
        }
        //drawTriangle(canvas,ctx);
        //drawCircle(ctx);
    }

}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function drawSquares(){
    var length = getRandomInt(0,40);
    ctx.fillStyle="lightblue";
    ctx.fillRect(getRandomInt(0,canvas.width),getRandomInt(0,canvas.height),length,length);

}
function fillbackgroundColor(canvas, backgroundColor){
    var context = canvas.getContext("2d");
    context.fillStyle = backgroundColor;
    context.fillRect(0,0,canvas.width,canvas.height);
}
function drawTriangle(canvas,context){
    context.beginPath();
    context.moveTo(100,100);
    context.lineTo(150,100);
    context.lineTo(125,75);
    context.closePath();
    context.lineWidth = 5;
    context.stroke();
    context.fillStyle = "red";
    context.fill();

}
function drawCircle(context){
    context.beginPath();
    //context.arc(300,200,50,0,2*Math.PI, true);
    var x = getRandomInt(0,canvas.width);
    var y = getRandomInt(0,canvas.height);
    var radius = getRandomInt(0,40);

    //context.arc(300,200,60,0,degreesToRadians(270),true);
    context.arc(x,y,radius,0,degreesToRadians(360), true);
    //context.closePath();
    //context.stroke();
    context.fillStyle = "lightblue";
    context.fill();
}
function degreesToRadians(degrees){
    return (degrees*Math.PI)/180;
}