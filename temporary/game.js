var canvas = document.getElementById( "display") ;
var ctx = canvas.getContext("2d");

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.setAttribute("tabindex", 0);
var x = 0;
var y = 0;

var rightPressed =  false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function blender(){
    ctx.beginPath();
    ctx.clearRect(0,0,800,450);
    ctx.rect(x,y,50,50);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    if(rightPressed){
        x += 10;
    }
    if(leftPressed){
        x -= 10;
    }
    if(upPressed){
        y -= 10;
    }
    if(downPressed){
        y += 10;
    }
}
function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        blender();
    }
    if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        blender();
    }
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
        blender();
    }
    if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
        blender();
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = false;
    }
    if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false;
    }
}

setInterval(blender,1000/60);

