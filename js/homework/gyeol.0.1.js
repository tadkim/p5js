var step = 8;
var stepRange = 1;
var jasoArray;
var flow;
var flowArray = [];

var matrixLen = 16;
var margin = 10;
var padding = {top:33, right:0, bottom:0, left:0 };


function setup(){
    createCanvas(displayWidth, displayHeight);
    background(0);
    noFill();
    stroke(255,50);
    strokeWeight(0.25);
    //A3 : 297 * 420
    
    
    translate(30, 30); //기본마진?
    
    for(var index = 0; index < matrixLen; index++){
        word(index*100, 0);
        stepRange++;
    }
}


function word(tx,ty){
//    console.log("current stepRange : " + stepRange);

    
    makeJaso(); //자소 좌표 및 글자 데이터 생성
    drawType(); //데이터 표현
    
    function makeJaso(){
        //결
        jasoArray = [
            {x1:0, y1:0, x2:20, y2:0},
            {x1:20, y1:0, x2:4, y2:30},

            {x1:40, y1:14, x2:45, y2:14},
            {x1:40, y1:24, x2:45, y2:24},
            {x1:45, y1:0, x2:45, y2:40},

            {x1:0, y1:50, x2:50, y2:50},
            {x1:50, y1:50, x2:50, y2:60},
            {x1:0, y1:60, x2:50, y2:60},
            {x1:0, y1:60, x2:0, y2:70},
            {x1:0, y1:70, x2:50, y2:70}
        ];
        
        
        
        //jasoArray의 내용을 바탕으로 flowArray에 문자 좌표를 추가한다.
        for(var i = 0; i < jasoArray.length; i++){
            var flow = new Flow(jasoArray[i].x1, jasoArray[i].y1,
                                jasoArray[i].x2, jasoArray[i].y2);
            flowArray.push(flow);
        }

    }//end MakeJaso
    
    function drawType(){
        
        for(var index=0; index < stepRange; index++){
            push();
            translate(tx, ty);
            noFill();
            for(var i = 0; i < flowArray.length; i++){
                var f = flowArray[i];
                f.update();
                f.display();
            }
            pop();
        } 
    }
}

//flow를 만드는 클래스
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



//코드개발을 위한 함수
function mousePressed(){
    noLoop();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    stepRange--;
    word(10,10);
  } else if (keyCode === RIGHT_ARROW) {
    stepRange++;
    word(10,10);
  }
}