game_status = "";
video = "";
rightWristX = "";
rightWristY = "";
rightWristScore = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    var canvas = createCanvas(700, 400);
    canvas.center();
    canvas.parent('canvas');

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    if (game_status == "start") {
        background(0);
        image(video, 0, 0, 700, 400);

        fill("#FF0000");
        stroke("black");
        rect(680, 0, 0, 20, 700);


        fill("black")
        stroke("black");
        rect( 0, 0, 20, 700);

    }

    if (rightWristScore > 0.2) {
        fill("red");
        stroke("red");
        circle(rightWristX, rightWristY, 30);
    }


}




function start() {
   game_status = "start"
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function restart() {

}

function gotPoses(results) {
    if (results.length > 0) {
        rightWristX = results[0].pose.wrist.x;
        rightWristY = results[0].pose.wrist.y;
        rightWristScore = result[0].pose.keypoints[10].score;
        console.log(rightWristScore);
    }
}

