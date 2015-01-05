/**
 * Created by LogicPlatypus on 5/01/2015.
 */
var numberOfWorkers = 8;
var workers = [];
var nextRow = 0;
var generation = 0;

window.onload = init;
function init(){
    setupGraphics();
    window.onresize = function(){
        resizeToWindow();
    }
    canvas.onclick = function(event){
            handleClick(event.clientX, event.clientY);
        };

    for(var i = 0; i < numberOfWorkers; i++){
        var worker = new Worker("mandelWorker.js");
        worker.onmessage = function(event){
            processWork(event.target, event.data);
        }
        worker.idle = true;//we add a property by ourselves, it's not the part of worker API
        workers.push(worker);
    }
    startWorkers();
}

function startWorkers(){
    generation++;
    nextRow = 0;

    for(var i =0; i<workers.length; i++){
        var worker = workers[i];
        if(worker.idle){
            var task = createTask(nextRow);
            worker.idle = false;
            worker.postMessage(task);
            nextRow++;
        }
    }
}

function processWork(worker, workerResults){
    if(workerResults.generation == generation) {
        drawRow(workerResults);
    }
    reassignWorkers(worker);
}

function reassignWorkers(worker){
    var row = nextRow++;
    if(row >= canvas.height){
        worker.idle = true;
    }else{
        var task = createTask(row);
        worker.idle = false;
        worker.postMessage(task);
    }
}

function handleClick(x, y){
    /* resize the area of the
     fractal we are computing, with the
     x, y position at the center of the
     new area. It also makes sure the
     new area has the same aspect ratio
     of the existing one */
    var width = r_max - r_min;
    var height = i_min - i_max;
    var click_r = r_min + width * x / canvas.width;
    var click_i = i_max + height * y / canvas.height;

    /* set the global variables that
     are used to create tasks for workers: the zoom
     level determines how far zoomed in we are into
     the fractal, which determines which values of
     the Mandelbrot Set are being computed */
    var zoom = 8;
    r_min = click_r -width/zoom;
    r_max = click_r + width/zoom;
    i_max = click_i - height/zoom;
    i_min = click_i + height/zoom;

    startWorkers();
}

function resizeToWindow(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var width = ((i_max - i_min) * canvas.width / canvas.height);
    var r_mid = (r_max + r_min) / 2;
    r_min = r_mid - width/2;
    r_max = r_mid + width/2;
    rowData = ctx.createImageData(canvas.width, 1);

    startWorkers();
}