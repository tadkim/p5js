
var custom = { minR: 1, maxR : 150, setPos_min : -50, setPos_max: 50 };
let w, h = 100;
var counter = 0;
//var ball;
var balls = [];
var isTint = false;


function setup(){

    createCanvas(displayWidth, displayHeight);
    translate(0, 200);
    noStroke();
    //makeGrid(); //그리드 만들기


    //ㅆ
    for(var index = 0; index < sso.length; index++){
        var ball = new Ball(sso[index].x, sso[index].y, custom.minR);
        balls.push(ball);    
    }

    //ㅗ
    for(var index = 0; index < oh.length; index++){
        var ball = new Ball(oh[index].x, oh[index].y, custom.minR);
        balls.push(ball);
    }

    //ㄹ
    for(var index = 0; index < rh.length; index++){
        var ball = new Ball(rh[index].x, rh[index].y, custom.minR);
        balls.push(ball);
    }

    //ㄹ


    for(var index = 0; index < ohl.length; index++){
        push();
        translate(200, 0);
        var ball = new Ball(ohl[index].x, ohl[index].y, custom.minR);
        balls.push(ball);
        pop();
    }

    //ㅣ
    for(var index = 0; index < li.length; index++){
        var ball = new Ball(li[index].x, li[index].y, custom.minR);
        balls.push(ball);

    }

    //ㅁ
    for(var index = 0; index < im.length; index++){
        var ball = new Ball(im[index].x, im[index].y, custom.minR);
        balls.push(ball);

    }
}


function draw(){

    fill(255, 100);
    rect(0, 0, width, height);
    fill(0);

    for(var i = 0; i < balls.length; i++){
//            balls[i].display();
//            balls[i].update(mouseX, mouseY);
        balls[i].makeArea(mouseX, mouseY);
//        if(isTint === true){ balls[i].tint(); }
    }

}



class Ball{

    constructor(tx, ty, tr){
        this.x = tx;
        this.y = ty;
        this.r = tr;
    }


    display(){
//            ellipse(this.x, this.y, this.r, this.r);
    }

    update(mx, my){

        var d = dist(this.x, this.y, mx, my);
        var mapR = map(d, 0, displayWidth, custom.minR, custom.maxR); //for raduis
        var mapX = map(mx, 0, displayWidth, custom.setPos_min, custom.setPos_max); //for pos
        var mapY = map(my, 0, displayHeight, custom.setPos_min, custom.setPos_max); //for pos

        var computeR = mapR;


        ellipse(this.x+mapX, this.y+mapY,
                computeR, computeR);

    }
    makeArea(mx, my){
        beginShape();
        vertex(this.x, this.y);
        vertex(this.x+10, this.y);
        vertex(this.x+30, this.y+20);
        vertex(this.x, this.y);
        endShape(CLOSE);   
    }

}


function makeGrid(){
    background(250);
    fill(5);
    stroke(100, 30);
    textSize(10);
    textAlign(CENTER, CENTER);
    for(var i = 0; i < height; i+=10){
        var labels = counter % 5;
        if(labels === 0){ 
            text(i,0, i);
            stroke(100, 100);
        }else{
            stroke(100, 30);
        }
        line(0, i, width, i);    
        line(i, 0, i, height);

        counter++;
    }
}