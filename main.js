video="";
objects="";
status="";
function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(480, 390);
    canvas.center();
}
function draw(){
    image(video, 0 , 0 , 480, 390);
    if(status != "" ){
     objectDetector.detect(video, gotResult);
     for(i = 0; i < objects.length; i++){
         document.getElementById("status").innerHTML= "status: objects detected";
         document.getElementById("number_of_objects").innerHTML="number of objects detected are : " + objects.length;
         fill("red");
         percent= floor(objects[i].confidence*100);
         text(objects[i].label+""+percent+"%", objects[i].x+ 15, objects[i].y+ 15);
         noFill();
         stroke("red");
         rect(objects[i].x , objects[i].y, objects[i].width , objects[i].height);
    }
}
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results){
   if(error){
       console.error(error);
   }
   else{
       console.log(results);
       objects=results;
   }
}