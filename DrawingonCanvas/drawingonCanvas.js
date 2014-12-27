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
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowColor = "black"
    if(shape == "circles")
    {
        //drawCircles();
        for(var i = 0; i<20; i++){
            drawCircle(ctx);
        }
    }
    else if (shape == "squares"){
        for(var i = 0; i<20; i++) {
            drawSquares();
        }
        //drawTriangle(canvas,ctx);
        //drawCircle(ctx);

    }
    //drawSimpleFace(ctx);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    drawText(canvas);
    var twitterBird = new Image();
    twitterBird.src = "twitterBird.png";
    twitterBird.onload = function(){
        ctx.drawImage(twitterBird,20,120,70,70);
    };


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

function drawSimpleFace(context){

    context.beginPath();
    context.arc(300,300,200,0,degreesToRadians(360),true);//draw the head
    context.stroke();

    context.beginPath();
    context.arc(200,250,25,0,degreesToRadians(360),true);//draw a left eye
    context.stroke();

    context.beginPath();
    context.arc(400,250,25,0,degreesToRadians(360),true);//draw a right eye
    context.stroke();

    context.beginPath();
    context.arc(300,350,75,degreesToRadians(20),degreesToRadians(160),false);//draw a mouth
    context.stroke();

    context.beginPath();
    context.moveTo(300,300);//draw a nose
    context.lineTo(300,350);
    context.stroke();

}
function updateTweets(twitters){
    var tweets = document.getElementById("tweets");
    for(var i =0;i< twitters.length; i++){
        var option = document.createElement("option");
        option.text = twitters[i].text;
        option.value = twitters[i].text.replace("\"","'");
        tweets.options.add(option);
    }
    tweets.selectedIndex = 0;
}
function drawText(canvas){
    var forgrndColorObj = document.getElementById("foregroundColor");
    var forgrndColor = forgrndColorObj[forgrndColorObj.selectedIndex].value;
    var tweets = document.getElementById("tweets");
    var text2 = tweets[tweets.selectedIndex].value;
    var text1 = "I saw this tweet";
    var text3 = "and all I got was this lousy t-shirt";
    //ctx.shadowBlur = 10;
    //ctx.shadowOffsetX = 3;
    //ctx.shadowOffsetY = 3;
    //ctx.shadowColor = "black"
    ctx.fillStyle = forgrndColor;
    ctx.font = "bold 1em sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(text1,20,40);

    ctx.font = "bold 1em sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(text3,canvas.width-20,canvas.height-40);

    ctx.font = "italic 1.2em times sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(text2,40,100);

}