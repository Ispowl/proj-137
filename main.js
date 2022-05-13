var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
status = "";
video = "";
object =[];
function preload(){
    
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);

    if(status != ""){
    objectDetector.detect(video,gotResult);
        for(i = 0; i<object.length; i++){
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(vald = object[i].label){
                document.getElementById("status").innerHTML = "Status : "+vald+" object";
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("found").innerHTML = "Object found";
                var synth = window.speechSynthesis;
   
                speak_data = "Object mentioned has been found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
    
            }

           
        }
        
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    
}

function modelLoaded(){
    console.log('Model loaded!');
    status = true;
    video.speed(1);
    video.volume(0);
    objectDetector.detect(video,gotResult);
    vald = document.getElementById("name_of_object").value;
}

function gotResult(error,results){
  if(error){
      console.log(error);
  }
  console.log(results);
  object = results;
}