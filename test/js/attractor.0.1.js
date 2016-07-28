console.log("runner_attractor.0.1.js");
var title = 'RUNNER';
var memo = 'RUNNER_1';
var waist = 20;
var legPaddingX = waist / 3;
var legPaddingY = 10;
var dif = 8; //다리 회전 정도
var legCount = 0;

var characters;
var characterArray = [];

function setup() {
    createCanvas(500, 500);
    background(255);
    stroke(0);
    noFill();
    strokeWeight(2);
    strokeJoin(ROUND);
    characters = new Character(50, 50);
    characters.display();
    frameRate(10);

}

function draw() {
    //            background(255);
    characters.update(legCount);
    characters.display();
    legCount++;
}

class Character {
    constructor(centerX, centerY) {
        this.centerPos = createVector(centerX, centerY);
        this.move = 4;
        this.l1 = createVector(centerX - legPaddingX, centerY + legPaddingY);
        this.l2 = createVector(centerX - legPaddingX, centerY + legPaddingY * 2);
        this.l3 = createVector(centerX - legPaddingX, centerY + legPaddingY * 3);
        //                this.l3 = createVector(centerX-legPaddingX - this.move, centerY+legPaddingY*3);

        this.r1 = createVector(centerX + legPaddingX, centerY + legPaddingY);
        this.r2 = createVector(centerX + legPaddingX, centerY + legPaddingY * 2);
        this.r3 = createVector(centerX + legPaddingX, centerY + legPaddingY * 3);
        //                this.r2 = createVector(centerX+legPaddingX + this.move/2, centerY+legPaddingY*2);
        //                this.r3 = createVector(centerX+legPaddingX + this.move, centerY+legPaddingY*3);
    }
    update(index) {
        //                console.log("update!");
        this.centerPos.x += 5;
        this.centerPos.y += 5;
        var isEven = (index % 2 === 0) ? this.move += 10 : this.move -= 10;


        this.l1.x = this.centerPos.x - legPaddingX;
        this.l1.y = this.centerPos.y + legPaddingY;
        this.l2.x = this.centerPos.x - legPaddingX;
        this.l2.y = this.centerPos.y + legPaddingY * 2;
        this.l3.x = this.centerPos.x - legPaddingX - this.move;
        this.l3.y = this.centerPos.y + legPaddingY * 3;



        this.r1.x = this.centerPos.x + legPaddingX;
        this.r2.x = this.centerPos.x + legPaddingX + this.move / 2;
        this.r3.x = this.centerPos.x + legPaddingX + this.move;

    }
    init() {
        console.log("init!");
        this.move -= 10;

        this.l3 = createVector(this.centerPos.x - legPaddingX - this.move, this.centerPos.y + legPaddingY * 3);
        this.r2 = createVector(this.centerPos.x + legPaddingX + this.move / 2, this.centerPos.y + legPaddingY * 2);
        this.r3 = createVector(this.centerPos.x + legPaddingX + this.move, this.centerPos.y + legPaddingY * 3);

    }
    display() {


        beginShape();
        vertex(this.l1.x, this.l1.y);
        vertex(this.l2.x, this.l2.y);
        vertex(this.l3.x, this.l3.y);
        endShape();

        beginShape();
        vertex(this.r1.x, this.r1.y);
        vertex(this.r2.x, this.r2.y);
        vertex(this.r3.x, this.r3.y);
        endShape();
        console.log(this.r3.x);
        ellipse(this.r1.x, this.r1.y, 6, 6);
        ellipse(this.l1.x, this.l1.y, 6, 6);


    }
}

function keyTyped() {
    if (key === 's') {
        var years = year() + '';
        var saveinfo = years.substring(2, 4) +
            month() +
            day() + '_';
        save(saveinfo + title + '_' + memo);
    }
    if (key === 'd') {
        background(255);
        characters.update();
        characters.display();
    } else if (key === 'a') {
        background(255);
        characters.init();
        characters.display();
    }
}

function mousePressed() {
    noLoop();
}