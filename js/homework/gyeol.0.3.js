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
    
    
//    save();
}


function word(tx,ty){
//    console.log("current stepRange : " + stepRange);

    var jasoArray_sa,
        jasoArray_ram,
        jasoArray_ui,
        jasoArray_gyeol;
    
    
    
    
    makeJaso(); //자소 좌표 및 글자 데이터 생성
    /*
    drawType(0); //데이터 표현
    drawType(1); //데이터 표현
    drawType(2); //데이터 표현
    drawType(3); //데이터 표현
    */
    
    //자소를 만드는 영역 ------------------------------------------------------------
    function makeJaso(){ 
        makeWord(100, 100, "오");
        makeWord(200, 100, "랜");
        makeWord(300, 100, "시");
        makeWord(400, 100, "간");
        //글자를 만든다.  사 sx, sy : 기준점
        function makeWord(sx, sy, letters){
            
            switch(letters){
                case "오" :
                    글자_오();
                    break;
                case "랜" :
                    글자_랜();
                    break;
                case "시" :
                    글자_시();
                    break;
                case "간" :
                    글자_간();
                    break;
                default :
                    sa();
                    break;
            }
            function 글자_오(){
                push();
                translate(sx, sy);
                이응("닿자");
                오();
                pop();
            }
            function 글자_랜(){
                push();
                translate(sx, sy);
                리을();
                애();
                니은("받침");
                pop();
            }
            function 글자_시(){
                push();
                translate(sx, sy);
                시옷();
                이();
                pop();
                
            }
            function 글자_간(){
                push();
                translate(sx, sy);
                기억("닿자");
                아();
                니은("받침");
                pop();
                
            }
            
            
            function sa(){
                //사
                push();
                translate(sx, sy);
                시옷();
                아();
                pop();
            }
            function ram(){
                //람
                push();
                translate(sx, sy);
                리을();
                아();
                이응("받침");
                pop();
            }
        }
        
        
        //자음
        function 시옷(){
            
            var data = [
                {x1:30, y1:0, x2:0, y2:35},
                {x1:30, y1:0, x2:30, y2:50}
            ];
            var drawingArray = [];
            
            //좌표데이터로 객체 생성
            for(var i = 0; i < data.length; i++){
                var f = new Flow(data[i].x1, data[i].y1, data[i].x2, data[i].y2);
                drawingArray.push(f);
            }
            //객체 배열로 그리기
            for(var i = 0; i < drawingArray.length; i++){
                var rows = drawingArray[i];
                rows.updateOBJ(rows.x1, rows.y1, rows.x2, rows.y2); //noise step만 올린다.
                rows.displayOBJ(); //noise step변경된 것을 그린다.
            }            
            
        }
        function 리을(){

            var data = [ 
                {x1:0, y1:0, x2:40, y2:0},
                {x1:40, y1:0, x2:40, y2:20},
                {x1:0, y1:20, x2:40, y2:20},
                {x1:40, y1:20, x2:0, y2:20},
                {x1:0, y1:20, x2:0, y2:40},
                {x1:0, y1:40, x2:40, y2:40}
            ];
            
            var drawingArray = [];
            
            //좌표데이터로 객체 생성
            for(var i = 0; i < data.length; i++){
                var f = new Flow(data[i].x1, data[i].y1, data[i].x2, data[i].y2);
                drawingArray.push(f);
            }
            //객체 배열로 그리기
            for(var i = 0; i < drawingArray.length; i++){
                var rows = drawingArray[i];
                rows.updateOBJ(rows.x1, rows.y1, rows.x2, rows.y2); //noise step만 올린다.
                rows.displayOBJ(); //noise step변경된 것을 그린다.
            }    
        }
        function 이응(types){
            var moaType = types;
            var data;
            
            //받침
            if(moaType === "닿자"){ 
               //닿자
                data = [ 
                    {x1:30, y1:0, x2:10, y2:10},
                    {x1:10, y1:10, x2:7, y2:25},
                    {x1:7, y1:25, x2:17, y2:35},
                    {x1:17, y1:35, x2:37, y2:35},
                    {x1:37, y1:35, x2:58, y2:25},
                    {x1:58, y1:25, x2:58, y2:7},
                    {x1:58, y1:7, x2:30, y2:0}
                ];
            } else if(moaType === "받침"){
               data = [ 
                    {x1:30, y1:50, x2:10, y2:60},
                    {x1:10, y1:60, x2:7, y2:75},
                    {x1:7, y1:75, x2:17, y2:85},
                    {x1:17, y1:85, x2:37, y2:85},
                    {x1:37, y1:85, x2:58, y2:65},
                    {x1:58, y1:75, x2:58, y2:57},
                    {x1:58, y1:57, x2:30, y2:50}
                ]; 
            }
            
            var drawingArray = [];
            
            //좌표데이터로 객체 생성
            for(var i = 0; i < data.length; i++){
                var f = new Flow(data[i].x1, data[i].y1, data[i].x2, data[i].y2);
                drawingArray.push(f);
            }
            //객체 배열로 그리기
            for(var i = 0; i < drawingArray.length; i++){
                var rows = drawingArray[i];
                rows.updateOBJ(rows.x1, rows.y1, rows.x2, rows.y2); //noise step만 올린다.
                rows.displayOBJ(); //noise step변경된 것을 그린다.
            }    
        }
        function 니은(types){
            var moaType = types;
            var data;
            
            //받침
            if(moaType === "닿자"){ 
               //닿자
                data = [ 
                    {x1:30, y1:0, x2:10, y2:10},
                    {x1:10, y1:10, x2:7, y2:25},
                    {x1:7, y1:25, x2:17, y2:35},
                    {x1:17, y1:35, x2:37, y2:35},
                    {x1:37, y1:35, x2:58, y2:25},
                    {x1:58, y1:25, x2:58, y2:7},
                    {x1:58, y1:7, x2:30, y2:0}
                ];
            } else if(moaType === "받침"){
               data = [ 
                    {x1:70, y1:60, x2:0, y2:60},
                    {x1:0, y1:45, x2:0, y2:60}
                ]; 
            }
            
            var drawingArray = [];
            
            //좌표데이터로 객체 생성
            for(var i = 0; i < data.length; i++){
                var f = new Flow(data[i].x1, data[i].y1, data[i].x2, data[i].y2);
                drawingArray.push(f);
            }
            //객체 배열로 그리기
            for(var i = 0; i < drawingArray.length; i++){
                var rows = drawingArray[i];
                rows.updateOBJ(rows.x1, rows.y1, rows.x2, rows.y2); //noise step만 올린다.
                rows.displayOBJ(); //noise step변경된 것을 그린다.
            }   
            
        }
        function 기억(types){
            var moaType = types;
            var data;
            
            //받침
            if(moaType === "닿자"){ 
               //닿자
                data = [ 
                    {x1:0, y1:5, x2:30, y2:5},
                    {x1:30, y1:5, x2:4, y2:35}
                ];
            } else if(moaType === "받침"){
               data = [ 
                    {x1:30, y1:50, x2:10, y2:60},
                    {x1:10, y1:60, x2:7, y2:75},
                    {x1:7, y1:75, x2:17, y2:85},
                    {x1:17, y1:85, x2:37, y2:85},
                    {x1:37, y1:85, x2:58, y2:65},
                    {x1:58, y1:75, x2:58, y2:57},
                    {x1:58, y1:57, x2:30, y2:50}
                ]; 
            }
            
            var drawingArray = [];
            
            //좌표데이터로 객체 생성
            for(var i = 0; i < data.length; i++){
                var f = new Flow(data[i].x1, data[i].y1, data[i].x2, data[i].y2);
                drawingArray.push(f);
            }
            //객체 배열로 그리기
            for(var i = 0; i < drawingArray.length; i++){
                var rows = drawingArray[i];
                rows.updateOBJ(rows.x1, rows.y1, rows.x2, rows.y2); //noise step만 올린다.
                rows.displayOBJ(); //noise step변경된 것을 그린다.
            }    
        }

        //모음
        function 오(){

            var data = [ 
                {x1:37, y1:35, x2:37, y2:60},
                {x1:10, y1:55, x2:70, y2:53}
            ];
            
            var drawingArray = [];
            
            //좌표데이터로 객체 생성
            for(var i = 0; i < data.length; i++){
                var f = new Flow(data[i].x1, data[i].y1, data[i].x2, data[i].y2);
                drawingArray.push(f);
            }
            //객체 배열로 그리기
            for(var i = 0; i < drawingArray.length; i++){
                var rows = drawingArray[i];
                rows.updateOBJ(rows.x1, rows.y1, rows.x2, rows.y2); //noise step만 올린다.
                rows.displayOBJ(); //noise step변경된 것을 그린다.
            }    
        }
        function 아(){

            var data = [
                {x1:55, y1:0, x2:55, y2:40},
                {x1:55, y1:20, x2:70, y2:20}
            ];
            
            var drawingArray = [];
            
            //좌표데이터로 객체 생성
            for(var i = 0; i < data.length; i++){
                var f = new Flow(data[i].x1, data[i].y1, data[i].x2, data[i].y2);
                drawingArray.push(f);
            }
            //객체 배열로 그리기
            for(var i = 0; i < drawingArray.length; i++){
                var rows = drawingArray[i];
                rows.updateOBJ(rows.x1, rows.y1, rows.x2, rows.y2); //noise step만 올린다.
                rows.displayOBJ(); //noise step변경된 것을 그린다.
            }    
        }
        function 애(){
            var data = [
                {x1:45, y1:25, x2:60, y2:25},
                {x1:45, y1:0, x2:42, y2:40},
                {x1:60, y1:0, x2:62, y2:40}
            ];
            
            var drawingArray = [];
            
            //좌표데이터로 객체 생성
            for(var i = 0; i < data.length; i++){
                var f = new Flow(data[i].x1, data[i].y1, data[i].x2, data[i].y2);
                drawingArray.push(f);
            }
            //객체 배열로 그리기
            for(var i = 0; i < drawingArray.length; i++){
                var rows = drawingArray[i];
                rows.updateOBJ(rows.x1, rows.y1, rows.x2, rows.y2); //noise step만 올린다.
                rows.displayOBJ(); //noise step변경된 것을 그린다.
            }    
        }
        function 이(){
            var data = [
                {x1:53, y1:0, x2:56, y2:60}
            ];
            
            var drawingArray = [];
            
            //좌표데이터로 객체 생성
            for(var i = 0; i < data.length; i++){
                var f = new Flow(data[i].x1, data[i].y1, data[i].x2, data[i].y2);
                drawingArray.push(f);
            }
            //객체 배열로 그리기
            for(var i = 0; i < drawingArray.length; i++){
                var rows = drawingArray[i];
                rows.updateOBJ(rows.x1, rows.y1, rows.x2, rows.y2); //noise step만 올린다.
                rows.displayOBJ(); //noise step변경된 것을 그린다.
            }    
        }
        
        
        
        
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