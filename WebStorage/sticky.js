/**
 * Created by LogicPlatypus on 31/12/2014.
 */
window.onload = stickiesInit;
var stickyKey = "sticky";
var stickCount = 0;
var maxCharPerLine = 18;
function stickiesInit(){
    var button = document.getElementById("add_button");
    button.onclick = stickIt;
    loadStickies();
    //load all the stickies and display it
}
function stickIt() {
    ////setItem(sticky_0, Text.input);
    //var key = stickyKey + "_" + stickCount;
    //stickCount += 1;
    //var textObj = document.getElementById("note_text");
    //var text = textObj.value;
    //localStorage.setItem(key, text);
    //drawSticky(key, text, 20, 50,maxCharPerLine);
    ////create a canvas to display the sticky

   /* a way better method to store the keys and values in localStorage */
    // 1.store the new key to the stickyKeyArray in localStorage
    var stickyKeysArray = getStickyKeysArray();
    var time = new Date();
    var key = "sticky_" + time.getTime();
    stickyKeysArray.push(key);
    localStorage.setItem("stickyKeys", JSON.stringify(stickyKeysArray));
    // 2. store the new sticky value along with a new key
    var textObj = document.getElementById("note_text");
    var text = textObj.value;
    localStorage.setItem(key, text);
    drawSticky(key, text, 20, 50,maxCharPerLine);
}
function drawSticky(stickyId,text,posX,posY,maxCharPerLine){
    /*var canvas = document.createElement("canvas");
    canvas.setAttribute("width","210px");
    canvas.setAttribute("height","250px");
    canvas.setAttribute("id",stickyId);
    var ctx = canvas.getContext("2d");
    ctx.font = "2em Lucida Grande serif";
    ctx.textAlign = "left";*/
    //ctx.fillText(text,20,50);
    // If you want to try splitIntoLines to
    // handle longer tweets, uncomment this code
    // and replace the context.fillText line above

   /*  if (text.length > maxCharPerLine) {
     var textLines = splitIntoLines(text, maxCharPerLine);
     for (var i = 0; i < textLines.length; i++) {
         ctx.fillText(textLines[i], 20, 70+(i*25));
     }
     }
     else {
         ctx.fillText(text, 20, 100);
     }*/
    var li = document.createElement("li");
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = text;
    li.appendChild(span);

    var ul = document.getElementById("stickies");
    ul.appendChild(li);
}
function loadStickies(){
    //foreach the localStorage to display all stickies
    var index = 0;
    //var key = "sticky_" + index;
    var stickyKeysArray = getStickyKeysArray();
  /*  old version of storing things
    for(index = 0; index < localStorage.length; index++){
        // A better way to get all the key in localStorage iteration is using the .key(i) property
        // var key = "sticky_" + index;//way 1
        var key = localStorage.key(index);//way 2

        //var text = localStorage["key"];
        if(key.substring(0,6)=="sticky"){//note: make sure what you get is what you want!!!!!
            var text = localStorage.getItem(key);
            if(text != null){
                drawSticky(key,text,20,50,20);
                stickCount += 1;
            }
        }

    }*/
    /* a way better method to store the keys and values in localStorage */
    for(index=0; index < stickyKeysArray.length; index++){
        var key = stickyKeysArray[index];
        var text = localStorage[key];
        drawSticky(key, text, 20, 50, 20);
    }

}
// Splits one long string into multiple lines of
// no more than 60 characters each. Returns an
// array of the lines.
function splitIntoLines(str,maxCharPerLine) {
    var strs = new Array();
    var splitStartIndex = 0;
    var splitEndIndex = 0;
    var numberOfLines = Math.ceil(str.length / maxCharPerLine);
    for(var lineIndex = 0; lineIndex < numberOfLines; lineIndex++){
        splitEndIndex = str.indexOf(' ',(splitStartIndex + maxCharPerLine));
        if(splitEndIndex >= maxCharPerLine){
            strs[lineIndex] = str.substring(splitStartIndex, splitEndIndex);
        }
        else{
            strs[lineIndex] = str.substring(splitStartIndex);//the last line
        }
        splitStartIndex = splitEndIndex;
    }

    //if (strs[1].length > maxCharPerLine) {
    //    splitIndex = strs[1].indexOf(' ', maxCharPerLine);
    //    strs[1] = strs[1].substring(splitIndex+1);
    //    strs[2] = strs[1].substring(0, splitIndex);
    //}
    return strs;
}
function getStickyKeysArray(){
    var stickyKeysArray = localStorage.getItem("stickyKeys");
    if(!stickyKeysArray){
        stickyKeysArray = [];
        localStorage.setItem("stickyKeys", JSON.stringify(stickyKeysArray));
    }
    else{
        stickyKeysArray = JSON.parse(stickyKeysArray);
    }
    return stickyKeysArray;
}