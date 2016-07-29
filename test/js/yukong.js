//yukong.js

let bodyWidth = 100;
let bodyHeight = 150; //100~ 200;

let canvasWidth = 1000;
let canvasHeight = 1000;
let facePos = bodyHeight / canvasHeight * bodyHeight * bodyHeight / 600;
let leftLeg1Angle = 0;
let rightLeg1Angle = -20;
let leftLeg2Angle = 0;
let rightLeg2Angle = 60;
let leftFeetAngle = 0;
let rightFeetAngle = 30;

var letterArray = [];
var moverArray = [];




function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(230);
    colorMode(HSL);
    
    //자소 생성 영역
    makeJasoByPoint();
    console.log(letterArray.length);
    
    
    //객체 초기화 영역
    for (var i = 0; i < letterArray.length; i++) {
        var m = new Mover();
        moverArray.push(m);
    }

    //객체 표현 영역
    for (var i = 0; i < letterArray.length; i++) {
        var l = letterArray[i];
        moverArray[i].display(l.x, l.y);
    }
}

function draw(){
    background(255);
    for(var i = 0; i < moverArray.length; i++){
        var m = moverArray[i];
        var l = letterArray[i];
        m.update(l.x, l.y);
        m.display();
    }
}




function makePointByLerp(startX, startY, endX, endY, len){
    var eachPos = (1.0/len);
    var from = {x:startX, y:startY};
    var to = {x:endX, y:endY};
    
    letterArray.push(from); //시작점
    //사이의 점을 len 수 만큼 생성
    for(var i=0; i < len; i++){
        var currentX = lerp(from.x, to.x, eachPos);
        var currentY = lerp(from.y, to.y, eachPos);
        var pos = {x:currentX, y:currentY};
        letterArray.push(pos);
        
        eachPos += 1.0/len;
    }
    letterArray.push(to); //끝점
}

function makeJasoByPoint(){
    //startX, startY, endX, endY, pointLen
    //pointlen : 시작점과 끝점 사이에 몇개의 점을 만들지
    var startX = 200;
    var startY = 200;
    var stalk = 100; //줄기 너비(for test)
    var pointNum = 2; //시작점과 끝점 사이 점 개수
    var gap = {jaso:100};
    //기억
    
    makePointByLerp(startX, startY, startX+stalk, startY, pointNum);
    makePointByLerp(startX+stalk, startY, startX+stalk, startY+stalk, pointNum);
    
    startX = startX + gap.jaso;
    makePointByLerp(startX+stalk, startY, startX+stalk, startY+stalk, pointNum);
}

class Mover {
    constructor() {
        this.centerPos = createVector(0, 0);
        this.x = random(0, width);
        this.y = random(-100, 0);
        
        this.leftLeg1Angle = 0;
        this.rightLeg1Angle = -20;
        
        this.leftLeg2Angle = 0;
        this.rightLeg2Angle = 60;
        
        this.leftFeetAngle = 0;
        this.rightFeetAngle = 30;
        this.angleDiversity = 0.3;
    }
   
    update(centerX, centerY){
        //중심점 업데이트
//        var noiseValue = random(-5, 5);
        var noiseValue = 3;
        this.centerPos.x = centerx;
        this.centerPos.y = centerY;
        
        //각도 업데이트
        var a = this.angleDiversity;
        this.leftLeg1Angle += a;
        this.rightLeg1Angle += a;
        
        this.leftLeg2Angle += a;
        this.rightLeg2Angle += a;
        
        this.leftFeetAngle += a;
        this.rightFeetAngle += a;
    }
    
    display(centerX, centerY) {
        fill(330, 60, 85);
        stroke(270, 60, 50);
        strokeWeight(4);
        rectMode(CENTER);
        
        
        var x = this.centerPos.x;
        var y = this.centerPos.y;

        //body
        rect(x, y, bodyWidth, bodyHeight, bodyWidth / 2);
        //face

        //face
        push();
        translate(x, y - facePos - bodyHeight / 8);
        face();
        pop();




        //leg1-left
        push();
        translate(x - bodyWidth / 5, y + bodyHeight / 3);
        rotate(radians(this.leftLeg1Angle));
        leg1();



        //leg2-left
        translate(0, bodyHeight / 3.5 - 10);
        rotate(radians(this.leftLeg2Angle));
        leg2();
        translate(0, bodyHeight / 6 - bodyHeight / 20);
        rotate(radians(this.leftFeetAngle));
        feet();
        pop();

        //leg1-right
        push();
        translate(x+ bodyWidth / 5, y + bodyHeight / 3);
        rotate(radians(this.rightLeg1Angle));
        leg1();


        //leg2-right
        translate(0, bodyHeight / 3.5 - 10);
        rotate(radians(rightLeg2Angle));
        leg2();


        //foot-right
        translate(0, bodyHeight / 6 - bodyHeight / 20);
        rotate(radians(this.rightFeetAngle));
        feet();
        pop();

    }


}

function face() {
    // rect(0,0,20,20);
    //eye-left
    push();
    translate(-bodyWidth / 30, bodyWidth / 40);
    eye();
    pop();
    //eye-right
    push();
    translate(bodyWidth / 3.5, 0);
    eye();
    pop();
    //mouth
    push();
    translate(bodyWidth / 3.5 - 15, 20);
    mouth();
    pop();
}

function eye() {
    //eye-white
    push();
    fill(330, 0, 100);
    stroke(270, 60, 50);
    strokeWeight(4);
    ellipse(0, 0, bodyWidth / 4, bodyWidth / 4);
    pop();
    //eye-pupil
    push();
    fill(270, 60, 50);
    noStroke();
    ellipse(-1, 0, bodyWidth / 6.5, bodyWidth / 6.5);
    pop();
}

function mouth() {
    push();
    noFill();
    stroke(270, 60, 50);
    strokeWeight(4);
    arc(0, 0, bodyWidth / 2 - bodyHeight / 30, bodyHeight / 7, 0, 19 * PI / 20);
    pop();
}
//다리 허벅지
function leg1() {
    push();
    fill(330, 60, 85);
    stroke(270, 60, 50);
    strokeWeight(4);
    rect(-bodyWidth / 10, 0, bodyWidth / 5, bodyHeight / 3.5, bodyWidth / 12);
    pop();
}

//다리 정강이
function leg2() {
    push();
    fill(330, 60, 100);
    stroke(270, 60, 50);
    strokeWeight(4);
    rect(-bodyWidth / 20, 0, bodyWidth / 10, bodyHeight / 6, bodyWidth / 12);
    pop();
}

function feet() {
    push();
    fill(270, 60, 50);
    stroke(270, 60, 50);
    strokeWeight(4);
    rect(-bodyWidth / 15, 0, bodyWidth / 5, bodyWidth / 10, bodyWidth / 12);
    // // rect(-bodyWidth/20,0,bodyWidth/5,bodyHeight/12,bodyWidth/30);
    // rect(-bodyWidth/10,10,bodyWidth/5,bodyHeight/12,bodyWidth/30);
    pop();
}