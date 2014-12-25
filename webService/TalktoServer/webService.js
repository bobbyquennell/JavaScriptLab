/**
 * Created by LogicPlatypus on 24/12/2014.
 */
// intial
window.onload=setupTimer;
var httpRequest = null;
var url = "http://192.168.1.14:8080/sales.json";//"http://localhost:8080/sales.json"
var remoteUrl="http://gumball.wickedlysmart.com/";
var oldReportTimestamp = 0;

function Record(name, time,sales){
    this.name = name;
    this.time = time;
    this.sales = sales;
}
function init(){
    //create a http request service
    httpRequest = new XMLHttpRequest();
    /*for XMLHttpRequest level2*/
    //httpRequest.onload = httpDataHandler;
    /* for XMLHttoRequest level 1*/
    httpRequest.onreadystatechange = httpDataHandler;
    httpRequest.open("GET",url);
    httpRequest.send();
}
// fetch data from server
function httpDataHandler(){
    //console.log(this.responseText);
    //if(httpRequest.status == 200){ //for XMLHttpRequest Level 2
    if(httpRequest.readyState == 4 && httpRequest.status == 200){ //for XMLHttpRequest Level 1
        //var table = document.getElementById("sales");
        //var sales = JSON.parse(httpRequest.responseText);
        //for(var i=0;i<sales.length;i++){
        //    var salesRecord = sales[i].name + " sold " + sales[i].sales + " gumballs";
        //    var td = document.createElement("td");
        //    var tr = document.createElement("tr");
        //    table.appendChild(tr);
        //    td.innerHTML = salesRecord;
        //    tr.appendChild(td);
        updateSales(httpRequest.responseText);
        //for test: alert("get data from server!");
    }
}
function updateSales(sales){
    var table = document.getElementById("sales");
    //var sales = JSON.parse(responseText);
    for(var i=0;i<sales.length;i++){
        var salesRecord = sales[i].name + " sold " + sales[i].sales + " gumballs at " + sales[i].time ;
        var td = document.createElement("td");
        var tr = document.createElement("tr");
        table.appendChild(tr);
        td.innerHTML = salesRecord;
        tr.appendChild(td);
    }
    if(sales.length>0){
        oldReportTimestamp = sales[sales.length-1].time;
    }
}
function setupTimer(){
    setInterval(timerHandler,500);
}
function timerHandler(){
    var script = document.createElement("script");
    var url = "http://gumball.wickedlysmart.com/?callback=updateSales";
    var urlwithTimeStamp = url + "&lastreporttime=" + oldReportTimestamp;
    var urlwithRandom= urlwithTimeStamp + "&random=" + (new Date()).getTime();
    script.setAttribute("src",urlwithRandom);
    script.setAttribute("id","jsonp");
    var head = document.getElementsByTagName("head")[0];
    var oldElement = document.getElementById("jsonp");
    if(oldElement == null){
        head.appendChild(script);
    }
    else{
        head.replaceChild(script,oldElement);
    }
}

// handle data, display sales data on web page

