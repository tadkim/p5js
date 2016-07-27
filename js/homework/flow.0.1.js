//flow를 만드는 클래스
class Flow{
    
    constructor(startX, starY, endX, endY){
        this.x1 = startX;
        this.y1 = starY;
        this.x4 = endX;
        this.y4 = endY;
        this.noiseStep = 0.0;
    }
    
    updateOBJ(startX, startY, endX, endY){
        this.x1 = startX;
        this.y1 = startY;
        this.x2 = endX;
        this.y2 = endY;
        
        this.noiseStep = random(0, step);
        this.noiseArea = noise(this.noiseStep) * stepRange;
    }
    displayOBJ(){  
        
        beginShape();
        var x1 = this.x1;
        var y1 = this.y1;
        var x4 = this.x4;
        var y4 = this.y4;
        
        var x2 = lerp(x1, x4, 셑.점위치1) + this.noiseArea;
        var y2 = lerp(y1, y4, 셑.점위치1) + this.noiseArea;
        var x3 = lerp(x1, x4, 셑.점위치2) + this.noiseArea;
        var y3 = lerp(y1, y4, 셑.점위치2) + this.noiseArea;
        
        curveVertex(x1, y1);
        curveVertex(x1, y1);
        curveVertex(x2, y2);
        curveVertex(x3, y3);
        curveVertex(x4, y4);
        curveVertex(x4, y4);
        endShape();
        
    }
}

