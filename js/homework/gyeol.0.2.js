//A3 : 297 * 420
var step = 8;
var stepRange = 1;


var jasoArray = new Array(4);
var jasoIndex = 0;
var flow;
var flowArray = [];

var letterSize = 120; //글자사이즈
var matrixLen = 40; //행렬사이즈

var margin = 10;
var padding = {top:33, right:0, bottom:0, left:0 };


function setup(){
    createCanvas(900, 2200);
    background(0);
    noFill();
    stroke(255,50);
    strokeWeight(0.25);
    
    
    
    translate(30, 30); //기본마진?
    var xPos = 0;
    var yPos = 0;
    for(var index = 0; index < matrixLen; index++){
        if(index % 4 == 0){
            xPos = 0;
            yPos = yPos + letterSize;
        } else {
            xPos = xPos + letterSize;
        }

        word(xPos, yPos);
        stepRange++;
    }
    
    
    save();
}


function word(tx,ty){
//    console.log("current stepRange : " + stepRange);

    var jasoArray_sa,
        jasoArray_ram,
        jasoArray_ui,
        jasoArray_gyeol;
    
    
    
    
    makeJaso(); //자소 좌표 및 글자 데이터 생성
    drawType(0); //데이터 표현
    drawType(1); //데이터 표현
    drawType(2); //데이터 표현
    drawType(3); //데이터 표현
    
    
    //자소를 만드는 영역 ----------------------------------------------------------------------
    function makeJaso(){ 
        //사
        jasoArray[0] = [
            {x1:30, y1:0, x2:0, y2:35},
            {x1:30, y1:0, x2:30, y2:50},
            {x1:50, y1:24, x2:70, y2:24},
            {x1:50, y1:0, x2:45, y2:70}
        ];
                
        //람
        jasoArray[1] = [
            //ㄹ
            {x1:0, y1:0, x2:40, y2:0},
            {x1:40, y1:0, x2:40, y2:20},
            {x1:0, y1:20, x2:40, y2:20},
            {x1:40, y1:20, x2:0, y2:20},
            {x1:0, y1:20, x2:0, y2:40},
            {x1:0, y1:40, x2:40, y2:40},
            //ㅏ
            {x1:50, y1:25, x2:70, y2:25},
            {x1:50, y1:0, x2:50, y2:60},//ㅣ 
            //ㅁ
            {x1:0, y1:70, x2:40, y2:70},
            {x1:40, y1:70, x2:40, y2:90},
            {x1:40, y1:90, x2:0, y2:90},
            {x1:0, y1:70, x2:0, y2:90}
        ];

        //의
        jasoArray[2] = [
            //ㅇ
            {x1:0, y1:0, x2:40, y2:0},
            {x1:40, y1:0, x2:40, y2:20},
            {x1:0, y1:20, x2:40, y2:20},
            {x1:40, y1:20, x2:0, y2:20},
            {x1:0, y1:20, x2:0, y2:40},
            {x1:0, y1:40, x2:40, y2:40},
            
            //ㅏ
            {x1:50, y1:0, x2:50, y2:80},
            
            //ㅡ
            {x1:0, y1:50, x2:50, y2:50}
            
        ];
        
        jasoArray[3] = [
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
            var jasoRows = jasoArray[i];
            flowArray[i] = new Array(jasoRows.length);
            for(var j = 0; j < jasoRows.length; j++){
                var flow = new Flow(jasoRows[j].x1, jasoRows[j].y1, jasoRows[j].x2, jasoRows[j].y2);
                flowArray[i][j] = flow;   
            }
            
        }
        
         //자소업데이트

    }//end MakeJaso
    
    
    //타입을 그리는 영역 ----------------------------------------------------------------------
    function drawType(letterType){
        var typeX = 0;
        var letterIndex = 0;
        var currentArray = flowArray[letterType]; //select typeArray
        
        switch(letterType){
            case 0 :
                typeX = 0;
                break;
            case 1 : 
                typeX = 100;
                break;
            case 2 : 
                typeX = 200;
                break;
            case 3 :
                typeX = 300;
                break;
            default :
                typeX = 100;
                break;
        }
        drawType_Line();
        
        function drawType_Line(){
            for(var index=0; index < stepRange; index++){
                push();
                translate(typeX, ty);
                for(var i = 0; i < currentArray.length; i++){
                    var f = currentArray[i];
                    f.update();
                    f.display();
                }
                pop();
            }   
        }
        
        function drawType_Circle(){
            for(var index=0; index < stepRange; index++){
                push();
                translate(typeX, ty);
                
                pop();
            }
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
    
    display_ellipse(){
        beginShape();
        var x1 = this.x1;
        var y1 = this.y1;
        var x4 = this.x4;
        var y4 = this.y4;
        
        var x2 = lerp(x1, x4, .25) + noiseArea;
        var y2 = lerp(y1, y4, .25) + noiseArea;
        var x3 = lerp(x1, x4, .75) + noiseArea;
        var y3 = lerp(y1, y4, .75) + noiseArea;
        
        curveVertex(x4, y1);
        curveVertex(x1, y1);
        curveVertex(x2, y2);
        curveVertex(x3, y3);
        curveVertex(x4, y4);
        curveVertex(x4, y4);
        endShape();
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