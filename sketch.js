let stars = []; // Array of star objects
let speedChange = 1; // Default speed is 1 

// Variable containing the colors of the stars
let myColor = {
    r: 255,
    g: 255,
    b: 255
};

function setup(){
    createCanvas(800, 800);
    background('black');


    // Start of with 3 stars
    for(let i = 0; i < 3 ; i++){
        stars.push(new star());
    }
}


function draw(){  
    //background('black');

    // Increase Speed 
    if(keyIsDown(UP_ARROW)){
        speedChange += 0.1;

        if(speedChange > 10){
            speedChange = 10;
        }
    }
    // Decrease Speed
    else if(keyIsDown(DOWN_ARROW)){
        speedChange -= 0.1;

        if(speedChange < 1){
            speedChange = 1;
        }
    }

    // Draw and move every star
    for(let i = 0; i < stars.length ; i++){
        stars[i].show();
        stars[i].move();
    }
}


/* Class Star */
class star {
    constructor(){
        this.xPos = 800 / 2;
        this.yPos = 800 / 2;
        this.scale = .1;
        this.xVel = randVel();
        this.yVel = randVel();
        this.alpha = 0;
    }

    show(){
        starCreate(this.xPos, this.yPos, 30 * this.scale, 70 * this.scale, 5, color(myColor.r, myColor.g, myColor.b));
    }

    move(){
        this.xPos += this.xVel * speedChange;
        this.yPos += this.yVel * speedChange;
        this.scale += 0.01 * speedChange;
        this.alpha += 0.01;

        // Reset Stars
        if(Math.round(this.scale) == 3){
            this.xPos = 800 / 2;
            this.yPos = 800 / 2;
            this.scale = .1;
            this.xVel = randVel() ;
            this.yVel = randVel();
            this.alpha = 0;
        }
    }
}

/* Function to create a star */
function starCreate(x, y, radius1, radius2, npoints, color) {
    fill(color);
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
}


/* Function to determine the velocity of X and Y coordinates */
function randVel(){
    let num = Math.round(random(0, 10)); // Change this for velocity

    if ( num % 2 == 0){
        return 1 * num;
    }
   
    else{
        return -1 * num;
    }
}

/* When mouse is pressed create a new star */
function mousePressed(){
    stars.push(new star(color(myColor.r, myColor.g, myColor.b)));
}

/* When mouse is dragged change colors */
function mouseDragged(){
    myColor.r = random(0,255);
    myColor.g = random(0,255);
    myColor.b = random(0,255);
}

// If S key is pressed save Image
function keyPressed() {  
    if(keyCode == 83){
        save('myCanvas.jpg');
    }
}