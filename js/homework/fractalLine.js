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
    
    
    
    
    //=============================
    updateOBJ(startX, startY, endX, endY){
        this.x1 = startX;
        this.y1 = startY;
        this.x2 = endX;
        this.y2 = endY;
        
        this.noiseStep = random(-step, step);
        this.noiseArea = noise(this.noiseStep) * stepRange;
    }
    displayOBJ(){  
        var x1 = this.x1;
        var y1 = this.y1;
        var x4 = this.x4;
        var y4 = this.y4;
        
        var x2 = lerp(x1, x4, .25);
        var y2 = lerp(y1, y4, .25);
        var x3 = lerp(x1, x4, .75);
        var y3 = lerp(y1, y4, .75);
        beginShape();
        vertex(x1, y1);
        vertex(x4, y4);
        endShape();
        
        var dx = lerp(x2, x3, .5);
        var dy = lerp(y2, y3, .5)-5;
        /*
        fill(0, 255, 0);
        ellipse(dx, dy, 4, 4);
        
        fill(255, 0, 0);
        ellipse(x2, y2, 4, 4);
        ellipse(x3, y3, 4, 4);
        noFill();
        */
        
        beginShape();
        vertex(x2, y2);
        vertex(dx, dy);
        vertex(x3, y3);
        endShape();
        
        getFractalOBJ(x2,y2, dx,dy);
        getFractalOBJ(dx,dy,x3,y3);
        
        
        function getFractalOBJ(tx1, ty1, tx2, ty2){
            stroke(255, 0, 0);
            var halfX = lerp(tx1, ty1);
            var halfY = lerp(tx2, ty2);
            beginShape();
            vertex(tx1,ty1);
            vertex(halfX,halfY);
            vertex(tx2,ty2);
            endShape();   
            stroke(255);
        }
        
    }
}

