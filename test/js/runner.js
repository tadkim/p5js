//yukong.js
var title = 'runner.js';
var memo = 'pattern_bird.js : 하트';

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
    background(0, 0, 80);
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
    background(0, 0, 80);
    
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


function keyTyped() {
    var years = year() + '';
    var saveinfo = years.substring(2, 4) + month() + day() + '_';
    switch (key) {
    case 's':
        console.log("save!");
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