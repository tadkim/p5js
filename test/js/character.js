//바디 길이에 따라 얼굴 위치와 입 호 높이가 조정된다.

let bodyWidth = 100;
let bodyHeight = 150; //100~ 200;
let canvasWidth = 300;
let canvasHeight = 300;
let facePos = bodyHeight / canvasHeight * bodyHeight * bodyHeight / 600;
let leftLeg1Angle = 0;
let rightLeg1Angle = -20;
let leftLeg2Angle = 0;
let rightLeg2Angle = 60;
let leftFeetAngle = 0;
let rightFeetAngle = 30;


function character1() {
    console.log("character1");
    body();

    function body() {
        console.log("body");
        
        push();
        fill(330, 60, 85);
        stroke(270, 60, 50);
        strokeWeight(4);
        rectMode(CENTER);
        translate(canvasWidth / 2, canvasHeight / 2);
        // rotate(45);
        rect(0, 0, bodyWidth, bodyHeight, bodyWidth / 2);
        pop();
        
        
        
        
        
        
        
        //face
        push();
        translate(canvasWidth / 2, canvasHeight / 2 - facePos - bodyHeight / 8);
        face();
        pop();
        
        
        
        //leg1-left
        push();
        translate(canvasWidth / 2 - bodyWidth / 5, canvasHeight / 2 + bodyHeight / 3);
        rotate(radians(leftLeg1Angle));
        leg1();
        //leg2-left
        translate(0, bodyHeight / 3.5 - 10);
        rotate(radians(leftLeg2Angle));
        leg2();
        translate(0, bodyHeight / 6 - bodyHeight / 20);
        rotate(radians(leftFeetAngle));
        feet();
        pop();
        //leg1-right
        push();
        translate(canvasWidth / 2 + bodyWidth / 5, canvasHeight / 2 + bodyHeight / 3);
        rotate(radians(rightLeg1Angle));
        leg1();
        //leg2-right
        translate(0, bodyHeight / 3.5 - 10);
        rotate(radians(rightLeg2Angle));
        leg2();
        //foot-right
        translate(0, bodyHeight / 6 - bodyHeight / 20);
        rotate(radians(rightFeetAngle));
        feet();
        pop();
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
}