img="";
status="";
objects=[];

function preload(){
img= loadImage("dog_cat.jpg");
}

function setup(){
canvas= createCanvas(380,380);
canvas.center();

video= createCapture( VIDEO );
video.size(380, 380);
video.hide();

objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML= " Status- Detecting Objects";

}

function draw(){
image( video , 0 , 0 , 380, 380);
/*fill("yellow");
stroke("black");
noFill();
rect(80, 60, 250, 350);
text("Dog", 85, 70);
stroke("black");
text("Cat" , 300, 100);
noFill();
rect(300, 90, 260, 310);*/
if(status != ""){
    objectDetector.detect(video, gotResult);
    for(i= 0 ; i< objects.length; i++ ){
        r= random(255);
        g= random(255);
        b= random(255);

        document.getElementById("num_objects").innerHTML= "Number of objects detected are :"+ objects.length;

    
    document.getElementById("status").innerHTML= " Status- Objects Detected ";
    fill(r, g, b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15 );
    noFill();
    stroke(r, g, b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}
}
}

function modelLoaded(){
    console.log("Model is Loaded");
    status= true;
    objectDetector.detect(video, gotResult);


}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}