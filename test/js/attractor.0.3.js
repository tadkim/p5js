//for runner

var title = 'runner_attractor.0.3.js';
var memo = 'drag and hover effect'
console.log(title + memo);


var moverNum = 100;
var moverArray =[];
var mover;



var ops = {
    ballSize : 12,
    bgCol : '#00bc9d',
    stalk:100
};

var letterArray =[];


//---------------------------
function setup(){
    createCanvas(canvasWidth,canvasHeight);
    background(230);
    colorMode(HSL);
    character1();
    noStroke();
    
/*
    makeJasoByPoint();
    
    
    for(var i = 0; i < letterArray.length; i++){
        moverArray[i] = new Mover();
    }
    console.log(moverArray.length);
*/
    
}
/*
function draw(){
    background(ops.bgCol);
    
    for(var i = 0; i< letterArray.length; i++){
        var l = letterArray[i];
        moverArray[i].drag();
        moverArray[i].hover(mouseX, mouseY);
        moverArray[i].update(l.x, l.y);
        moverArray[i].display();
    }
}
*/
    

function makePointByLerp(startX, startY, endX, endY, len){

    var resultArray = [];
    
    var fromX = startX;
    var fromY = startY;
    var toX = endX;
    var toY = endY;
    var eachPos = (1.0/len);
    
    
    var from = {x:fromX, y:fromY};
    var to = {x:toX, y:toY};
    
    resultArray.push(from);
    
    for(var i=0; i < len; i++){
        var currentX = lerp(fromX, toX, eachPos);
        var currentY = lerp(fromY, toY, eachPos);
        
        var pos = {x:currentX, y:currentY};
        resultArray.push(pos);
        eachPos += 1.0/len;
    }
    resultArray.push(to);
    
    
    for(var j = 0; j < resultArray.length; j++){
        letterArray.push(resultArray[j]);
    }
    
   
}

function makeJasoByPoint(){
    //startX, startY, endX, endY, pointLen
    //pointlen : 시작점과 끝점 사이에 몇개의 점을 만들지
    
    var startX = 200;
    var startY = 200;
    var stalk = 100; //줄기 너비(for test)
    var pointNum = 8; //시작점과 끝점 사이 점 개수
    var gap = {jaso:100};
    //기억
    
    makePointByLerp(startX, startY, startX+stalk, startY, pointNum);
    makePointByLerp(startX+stalk, startY, startX+stalk, startY+stalk, pointNum);
    
    startX = startX + gap.jaso;
    makePointByLerp(startX+stalk, startY, startX+stalk, startY+stalk, pointNum);
}





class Mover{
    constructor(){
        this.location = createVector(random(0, width), random(height, height+100));
        this.velocity = createVector(random(-0.1,0.1),random(-0.1,0.1));
        this.acceleration = createVector(-0.01,0.01);
        this.mass = ops.ballSize;
        this.maxSpeed = 3;
        
        this.dragging = false;
        this.dragOffset = createVector(0.0, 0.0);
        this.rollover = false;
    }
    
    applyForce(pvForce){
        var f = p5.Vector.div(pvForce,this.mass);
//        console.log(pvForce);
        this.acceleration.add(f);
    }
    
    update(targetX, targetY){
        
        
        var targetPos = createVector(targetX, targetY);
        var direction = targetPos.sub(this.location);
            direction.normalize();
            direction.mult(1);
        
            this.acceleration = direction;
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
            this.location.add(this.velocity);
            this.acceleration.mult(0);
    }
    
    display(){

        ellipseMode(CENTER);
        if(this.dragging){
            fill(50); 
        }
        else if(this.rollover){ 
            this.location.x += random(-30, 30);
            this.location.y += random(-30, 30);
            fill(255); 
        }
        else { fill(255); }
        
        ellipse(this.location.x, this.location.y, this.mass*2, this.mass*2);
    }
    //클릭
    clicked(mx, my){
        var d = dist(mx, my, this.location.x, this.location.y);
        if( d < this.mass){
            this.dragging = true;
            this.dragOffset.x = this.location.x-mx;
            this.dragOffset.y = this.location.y-mx;
        }
    }
    
    //드래그
    drag(){
        if(this.dragging){
            this.location.x = mouseX + this.dragOffset.x;
            this.location.y = mouseY + this.dragOffset.y;   
        }
    }
    //마우스오버
    hover(mx, my){
        var d = dist(mx, my, this.location.x, this.location.y);
        if( d < this.mass){
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }
    stopDragging(){
        this.dragging = false;
    }
    checkEdges(){
        if(this.location.x > width){ this.location.x = 0;}
        else if(this.location.y < 0){ this.location.x = width; }
        
        if(this.location.y > height){ this.location.y = 0;}
        else if(this.location.y < 0){ this.location.y = height; }
    }
}
    
    
    
function mousePressed(){
    console.log(letterArray);
    for(var i = 0; i< letterArray.length; i++){
        var l = letterArray[i];
        moverArray[i].clicked(mouseX, mouseY);
//        moverArray[i].display();
        
    }

}
function mouseReleased(){
    for(var i = 0; i< letterArray.length; i++){
        var l = letterArray[i];
        moverArray[i].stopDragging();
        
    }
}


function keyTyped(){
    if(key === 's'){
        var years = year()+'';
        var saveinfo = years.substring(2,4) +
            month() +
            day() + '_';
        save(saveinfo + title + '_' + memo);
    }
}