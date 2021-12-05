song = "";
status = "";
object = [];
function preload() {
    song = loadSound("music.mp3");
}


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}


function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        R = random(255);
        G = random(255);
        B = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill(R, G, B);
            percent = floor(object[i].confidence * 100);

            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(R, G, B);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label == "person") {
                document.getElementById("objects").innerHTML = "Baby Detected!";
                song.stop();
                console.log("stop");
            }
            else {
                document.getElementById("objects").innerHTML = "Baby Not Found!!";
                song.play();
                console.log("Play");
            }
        }
        //if (object.length == 0) {
            //document.getElementById("objects").innerHTML = "Baby Not Found!!";
            //song.play();
           // console.log("Play");
        //}
    }



}
