/**
 * Created by LogicPlatypus on 5/01/2015.
 */

importScripts("workerlib.js");
onmessage = function(task){
    var workerResult = computerRow(task.data);
    postMessage(workerResult);
}