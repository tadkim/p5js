//yukong.js
var title = 'runner_yukong.0.2.js';
var memo = '배치완료, 각도수정. 자소위치는 임의(레터링위해)';

//let bodyWidth = 100;
//let bodyHeight = 150; //100~ 200;
let bodyWidth = 40;
let bodyHeight = 70; //100~ 200;

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


var options = {
    legAngle: 0
};



function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(255, 238, 0);
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

function draw() {
    var c = color('hsl(56, 100%, 50%)');
    background(c);
    for (var i = 0; i < moverArray.length; i++) {
        var m = moverArray[i];
        var l = letterArray[i];
        m.update(l.x, l.y);
        m.display();
    }
}




function makePointByLerp(startX, startY, endX, endY, len) {
    var eachPos = (1.0 / len);
    var from = {
        x: startX,
        y: startY
    };
    var to = {
        x: endX,
        y: endY
    };

    letterArray.push(from); //시작점
    //사이의 점을 len 수 만큼 생성
    for (var i = 0; i < len; i++) {
        var currentX = lerp(from.x, to.x, eachPos);
        var currentY = lerp(from.y, to.y, eachPos);
        var pos = {
            x: currentX,
            y: currentY
        };
        letterArray.push(pos);

        eachPos += 1.0 / len;
    }
    letterArray.push(to); //끝점
}

function makeJasoByPoint() {
    //startX, startY, endX, endY, pointLen
    //pointlen : 시작점과 끝점 사이에 몇개의 점을 만들지
    var startX = 200;
    var startY = 200;
    var stalk = 100; //줄기 너비(for test)
    var pointNum = 2; //시작점과 끝점 사이 점 개수
    var gap = {
        jaso: 100
    };
    //기억

    makePointByLerp(startX, startY, startX + stalk, startY, pointNum);
    makePointByLerp(startX + stalk, startY, startX + stalk, startY + stalk, pointNum);

    startX = startX + gap.jaso;
    makePointByLerp(startX + stalk, startY, startX + stalk, startY + stalk, pointNum);
}

class Mover {
    constructor() {
        this.centerPos = createVector(0, 0);
        this.location = createVector(random(0, width), random(height, height + 100));
        this.velocity = createVector(random(-0.001, 0.001));
        this.acceleration = createVector(0.0, 0.0);
        this.maxSpeed = 2;

        this.isArrived = false;
        //각도 변수
        this.leftLeg1Angle = 0;
        this.rightLeg1Angle = -20;

        this.leftLeg2Angle = 0;
        this.rightLeg2Angle = 60;

        this.leftFeetAngle = 0;
        this.rightFeetAngle = 30;
        this.angleDiversity = 0.3;

    }

    update(targetX, targetY) {
        var target = createVector(targetX, targetY);

        var dir = p5.Vector.sub(target, this.location);
        //        console.log(abs(dir.x));

        if (abs(dir.x) > 1) {
            dir.normalize();
            dir.mult(1);


            this.acceleration = dir;
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
            this.location.add(this.velocity);
            this.acceleration.mult(0);

            this.centerPos.x = targetX;
            this.centerPos.y = targetY;
        } else {
            this.isArrived = true;
        }

        if (this.isArrived) {
            //각도 업데이트
            var a = this.angleDiversity;
            var toAngle = 80;

            this.leftLeg2Angle += ((-toAngle) - this.leftLeg2Angle) * 0.05;
            this.rightLeg2Angle += (toAngle - this.rightLeg2Angle) * 0.05;
//            console.log(this.rightLeg2Angle);

            this.leftFeetAngle = options.legAngle;
            this.rightFeetAngle = options.legAngle;
        }


    }

    display() {
        fill(330, 60, 85);
        stroke(270, 60, 50);
        strokeWeight(4);
        rectMode(CENTER);

        //target위치에 놓기
        //        var x = this.centerPos.x;
        //        var y = this.centerPos.y;
        //밖에서 가져오기


        var x = this.location.x;
        var y = this.location.y;




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
        translate(x + bodyWidth / 5, y + bodyHeight / 3);
        rotate(radians(this.rightLeg1Angle));
        leg1();


        //leg2-right
        translate(0, bodyHeight / 3.5 - 10);
        rotate(radians(this.rightLeg2Angle));
        leg2();


        //foot-right
        translate(0, bodyHeight / 6 - bodyHeight / 20);
        rotate(radians(this.rightFeetAngle));
        feet();
        pop();


        //body
        rect(x, y, bodyWidth, bodyHeight, bodyWidth / 2);
        //face

        //face
        push();
        translate(x, y - facePos - bodyHeight / 8);
        face();
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


function keyTyped() {
    var years = year() + '';
    var saveinfo = years.substring(2, 4) + month() + day() + '_';
    switch (key) {
    case 's':
        save(saveinfo + title + '_' + memo);
        break;
    case 'd':
        options.legAngle += 2;
        console.log("options.legAngle : " + options.legAngle);
        break;
    case 'a':
        options.legAngle -= 2;
        console.log("options.legAngle : " + options.legAngle);
        break;
    default:
        break;
    }
}

function mousePressed() {
    noLoop();
}