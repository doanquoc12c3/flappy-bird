let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();
let gameOver = new Image();
let start = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
gameOver.src = "images/gameOver.png";
start.src = "images/start.png"


// some letiables

let gap = 85;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1;

let score = 0;

// audio files

let fly = new Audio();
let scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 20;
    fly.play();
}

// pipe coordinates

let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};
let scoreArr =[0];
let maxS =0;
let speed = 2;
// draw images

let myReq;
let canvasElem = document.querySelector("canvas");
let startButton;
function draw(){
    
    ctx.drawImage(bg,0,0,400,512);



    
    for(let i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant+5);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            scoreArr.push(score);
            window.localStorage.setItem('Score Array', scoreArr);
            ctx.drawImage(gameOver,100,90);
            ctx.drawImage(start,160,260,100,50)
            // startButton();
            cancelAnimationFrame(myReq);
            return;

            // alert('new')
            // location.reload(); // reload the page
        }

        if(pipe[i].x == 5){

            score++;
            // scor.play();
        }
        
        
    }



    function maxScore(){
        let arr = window.localStorage.getItem('Score Array');
        let max = arr[0];
        for(let i =0;i<arr.length;i++){
            if(max<arr[i]){}
            max = arr[i];
        }
        return max;
    }
    // startButton()
    maxS = maxScore();

    ctx.drawImage(fg,0,cvs.height - fg.height,400,118);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-40);
    ctx.fillText("Highest score : "+ maxS ,10,cvs.height-5);

    myReq = requestAnimationFrame(draw);

    
}
function getMousePosition(cvs, event) {
    let rect = cvs.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x,
        "Coordinate y: " + y);
    if(253>x && 164<x && 263 <y && 304 > y){
        location.reload()
    }
}
canvasElem.addEventListener("mousedown", function(e)
{
    getMousePosition(canvasElem, e);
});

draw();
























