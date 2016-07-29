
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
        
//        fill(330, 60, 85);
        
        noStroke();

        var x = this.location.x;
        var y = this.location.y;
        var xRange = 60;
        var yRange = 50;
        var xPos = x + xRange;
        var yPos = y + yRange;
        
//        noFill();
        
        /*
        beginShape();
        vertex(x, y);
        bezierVertex(xPos, y, xPos, yPos, x, yPos);
        bezierVertex(x-30, yPos, x-30, y, x, y);        
        endShape();
        */
        
        
        //하트
        //새머리 - 세로형 만들기
        
        fill('hsl(170,70%,55%)');
        beginShape();
        vertex(x, y);
        bezierVertex(x, yPos, xPos, yPos, xPos, y);
        bezierVertex(xPos, y-30, x, y-30, x, y);        
        endShape();
        
        fill('hsl(56,100%,50%)');
        beginShape();
        vertex(x, y);
        bezierVertex(x, yPos, xPos, yPos, xPos, y);
        bezierVertex(xPos, y-10, x, y-10, x, y);        
        endShape();
        
        
/*


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

*/
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
