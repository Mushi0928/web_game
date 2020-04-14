var canvas = document.getElementById( "display") ;
var ctx = canvas.getContext("2d");

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.setAttribute("tabindex", 0);

var spacePressed = false;
const G = 0.1;
const heightLimit = 150;

//gameObjects
class SceneObj{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    render(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
class Player{
    constructor(width,height,color){
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = 0;
        this.x = 100;
        this.y = 300 - this.height;
        this.a = 0;
    }
    render(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update(){
        if(spacePressed && this.velocity == 0){
            this.velocity = 5;
        }
        this.y -= this.velocity;
        if(this.y >= 300-this.height){
            this.a = 0;
            this.velocity = 0;
            this.y = 300-this.height;
        }else{
            if(spacePressed){
                this.a = G/7;
            }else{
                this.a = G;
            }
            this.velocity -= this.a;
        }
        if(this.y + this.height <= heightLimit){
            this.y = heightLimit - this.height + 1;
            this.velocity =  -1 ; 
        }
        
        
    }

}
//keyHandlers
function keyDownHandler(e){
    if(e.key == ' '){
        spacePressed = true;
        console.log('幹');
    }
}
function keyUpHandler(e){
    if(e.key == ' '){
        spacePressed = false;
    }
} 
//main functions
function init(){
    ground = new SceneObj(0,300,canvas.width,canvas.height-200,'gray');
    player = new Player(80,80,'red');
    }
function update(){
    //update
    player.update();
    //render
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ground.render();
    player.render();
 
    

}
//execute
init();
setInterval(update,1000/60);
