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


//-------------
var 셑 = {
    스텝 : 1,
    가로 : 900,
    세로 : 1300,
    배경색 : 'black',
    선 : { 색 : 255, 알파 : 200, 굵기 : 0.25  },
    마진 : 30,
    자간 : 120,
    행간 : 100,
    점위치1 : 0.25,
    점위치2 : 0.75,
    거미줄변화폭 : 2.5,
    몇줄:10,
    스케일:1.8
};

//---------------------------
function setup(){
    createCanvas(1000, 500);
    background(230);
    noStroke();

    makeJasoByPoint();
    makeWord();
    for(var i = 0; i < letterArray.length; i++){
        moverArray[i] = new Mover();
    }
    console.log(moverArray.length);

    
}
    

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



function makeWord(){ 
        var m = 셑.마진; //margin
        var ls = 셑.자간; //letterspace
        var lh = 셑.행간; //lineheight
        
        makeJaso(m, 0, "사");
        makeJaso(200, 0, "람");
//        makeJaso(m+ls*2, ty, "시");
//        makeJaso(m+ls*3, ty, "간");
        
        // 자소 생성함수 ====================
        function makeJaso(sx, sy, letters){
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
                case "사" :
                    글자_사();
                    break;
                case "람" :
                    글자_람();
                    break;
                default :
                    글자_사();
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
            function 글자_사(){
                push();
                translate(sx, sy);
                시옷();
                아();
                pop();
                
            }
            function 글자_람(){
                push();
                translate(sx, sy);
                리을();
                아();
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
        }
        
        
        
        //*** 글자 생성 시스템 *******
        
        //자음
        function 시옷(){
            
            var data = [
                { 
                    x1:ops.stalk/2, y1:0, 
                    x2:ops.stalk/2, y2:ops.stalk/3
                },
                {
                    x1:ops.stalk/2, y1:ops.stalk/3,
                    x2:ops.stalk/3, y2:ops.stalk
                },
                {
                    x1:ops.stalk/2, y1:ops.stalk/3,
                    x2:ops.stalk-ops.stalk/3, y2:ops.stalk
                }
            ];
            
        
            //좌표데이터로 객체 생성
            for(var i =0; i < data.length; i++){
                var row = data[i];
                makePointByLerp(row.x1, row.y1,row.x2, row.y2, 10);      
            }          
            
        }
        function 리을(){
            var s = ops.stalk;
            var data = [ 
                {x1:0, y1:0, x2:s/2, y2:0},
                {x1:s/2, y1:0, x2:s/2, y2:s/5},
                {x1:0, y1:s/5, x2:40, y2:s/5},
                {x1:s/2, y1:s/5, x2:0, y2:s/5},
                {x1:0, y1:s/5, x2:0, y2:s/2},
                {x1:0, y1:s/2, x2:s/2, y2:s/2}
            ];
            
            
            
                       //좌표데이터로 객체 생성
            for(var i =0; i < data.length; i++){
                var row = data[i];
                makePointByLerp(row.x1, row.y1,row.x2, row.y2, 10);      
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
            var stalk = ops.stalk;
            var data = [
                {x1:stalk, y1:0, x2:stalk, y2:stalk},
                {x1:stalk, y1:stalk/5, x2:stalk+20, y2:stalk/5}
            ];
            
                       //좌표데이터로 객체 생성
            for(var i =0; i < data.length; i++){
                var row = data[i];
                makePointByLerp(row.x1, row.y1,row.x2, row.y2, 10);      
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
        
        
        
    }//end MakeJaso

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