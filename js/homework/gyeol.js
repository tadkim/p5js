var step = 8;
var stepRange = 20;
var jasoArray =[
    {x1:0, y1:0, x2:20, y2:0},
    {x1:20, y1:0, x2:15, y2:30},
    
    {x1:40, y1:10, x2:45, y2:10},
    {x1:40, y1:20, x2:45, y2:20},
    {x1:45, y1:0, x2:45, y2:40},
    
    {x1:0, y1:50, x2:50, y2:50},
    {x1:50, y1:50, x2:50, y2:60},
    {x1:0, y1:60, x2:50, y2:60},
    {x1:0, y1:60, x2:0, y2:70},
    {x1:0, y1:70, x2:50, y2:70},
    
];
var flow;
var flowArray = [];
function setup(){
    createCanvas(500, 500);
    background(0);
    noFill();
    strokeWeight(0.75);



    for(var i = 0; i < jasoArray.length; i++){
        var flow = new Flow(jasoArray[i].x1, jasoArray[i].y1,
                            jasoArray[i].x2, jasoArray[i].y2);
        flowArray.push(flow);
    }
    
    
   
}


function draw(){
    background(0,30);
    stroke(255);
    push();
    translate(10, 10);
    noFill();
    for(var i = 0; i < flowArray.length; i++){
        var f = flowArray[i];
        f.update();
        f.display();
    }
    pop();
    
    
}


class Flow{
    constructor(startX, starY, endX, endY){
        this.x1 = startX;
        this.y1 = starY;
        this.x4 = endX;
        this.y4 = endY;
        
        this.noiseStep = 0.0;
    }
    update(){
        this.noiseStep += 0.2;
    }
    display(){        
        
        
        var randomStep = random(-step, step);
        var noiseArea = noise(randomStep) * stepRange;
//        var noiseArea = noise(this.noiseStep) * stepRange;
        
        console.log(noiseArea);
        beginShape();
        var x1 = this.x1;
        var y1 = this.y1;
        var x4 = this.x4;
        var y4 = this.y4;
        
        var x2 = lerp(x1, x4, .25) + noiseArea;
        var y2 = lerp(y1, y4, .25) + noiseArea;
        var x3 = lerp(x1, x4, .75) + noiseArea;
        var y3 = lerp(y1, y4, .75) + noiseArea;
        
        curveVertex(x1, y1);
        curveVertex(x1, y1);
        curveVertex(x2, y2);
        curveVertex(x3, y3);
        curveVertex(x4, y4);
        curveVertex(x4, y4);
        endShape();
        
    }
}


function mousePressed(){
    noLoop();
}