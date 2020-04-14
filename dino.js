var canvas = document.getElementById( "display") ;
var ctx = canvas.getContext("2d");

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.setAttribute("tabindex", 0);

var spacePressed = false;
const G = 0.1;
const heightLimit = 150;

var isPlaying = true;

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
//obstacle system
class obstacleHandler{
     constructor(baseDelay,range){
        this.baseDelay = baseDelay;
        this.range = range;
        this.tick = 0;
        this.obstacleList = [];
        this.indexToDelete = [];
        this.next = this.nextDelay();
     }
     nextDelay(){
         var x = this.baseDelay + Math.floor(Math.random()*this.range);
         return x;
     }
     createObstacle(){
         var rand = Math.floor(Math.random()*3);
         var obs;
         switch (rand){
            case 0:
                obs = new obstacle(50,100,"blue",5);
                this.obstacleList.push(obs);
                //console.log("a");
                break;
            case 1:
                obs = new obstacle(50,100,"green",6);
                this.obstacleList.push(obs);
                //console.log("b");
                break;
            case 2:
                obs = new obstacle(50,100,"yellow",7);
                this.obstacleList.push(obs);
                //console.log("c");
                break;
        }    
     }
     update(){
         this.tick += 1;
         if(this.tick >= this.next){
             this.tick = 0;
             this.next = this.nextDelay();
             this.createObstacle();
         }
         var nextList = [];
         this.obstacleList.forEach(function(item,index,array){
            item.update();
            if(!item.outOfBound){
                nextList.push(item);
            }
        });
        this.obstacleList = nextList.slice();
     }
     render(){
        this.obstacleList.forEach(function(item,index,array){
            item.render();
        });
     }
}
class obstacle{
    constructor(width,height,color,velocity){
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = velocity;
        this.x = canvas.width;
        this.y = 300 - this.height;
        this.outOfBound = false;
    }
    render(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        //console.log("rect rendering")  
    }
    update(){
        if(rectCollision(player.x,player.y,player.width,player.height,
                         this.x,this.y,this.width,this.height)){
                         console.log("collided");
                         isPlaying = false;    
                         }else{
                             console.log("not collided");
                         }
        this.x -= this.velocity;
        if(this.x < 0 - this.width){
            this.outOfBound = true;
        }
    }
}
//collision detector
function rectCollision(x1,y1,w1,h1,x2,y2,w2,h2){
    if(x1+w1>x2 && x1<x2+w2 && y1+h1>y2 && y1<y2+h2){
        return true;
    }else{
        return false;
    }
}
//keyHandlers
function keyDownHandler(e){
    if(e.key == ' '){
        spacePressed = true;
        //console.log('幹');
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
    obsHandler = new obstacleHandler(200,50);
    }
function update(){
    if(isPlaying){
        //update
        player.update();
        obsHandler.update();
        //render
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ground.render();
        player.render();
        obsHandler.render();
    }else{
        var image = new Image(400,150);
        image.src = 'https://i.imgur.com/hbjq8Ii.png';
        ctx.drawImage(image,200,0,image.width,image.height);
    }
}
//execute
init();
setInterval(update,1000/60);
