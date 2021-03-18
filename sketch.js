var bananaImage;
var obstacleImage,obstacleGroup;
var backImage;
var score;
var player_running;
var bananaGroup;
var gamestate;
var out;
function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  backImage=loadImage("jungle.jpg");
  obstacleImage=loadImage("stone.png");
  bananaImage=loadImage("banana.png");
  }

function setup() {
  createCanvas(400, 400);
  back=createSprite(0,0,600,600);
  back.addImage("scene",backImage);
  back.velocityX=-4;
  monkey = createSprite(30,370,20,50);
  monkey.addAnimation("running", player_running);
  monkey.scale = 0.1;
 obstacleGroup=createGroup();
  bananaGroup=createGroup();
  
  ground = createSprite(200,370,400,20);
  ground.visible=false;
  ground.velocityX = -4;
  score = 0;
  gamestate=1;
  out=0;
}

function draw() {
  background(220);
  if(gamestate===1){
    if(bananaGroup.isTouching(monkey)){
    score = score + 2;
      bananaGroup.destroyEach();
  }
   if (score===30){
     monkey.scale=monkey.scale+0.1;
   } 
    ground.velocityX=-4;
      
    if(keyDown("space")&&monkey.y<368) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.6;
  
    
    spawnBanana();
  spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      out=out+1;
       }
    if (out===3){
      gamestate=2;
    }
  }
  
    if (gamestate===2){
      monkey.scale=0.1;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
    }
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if (back.x < 0){
    back.x = back.width/2;
  }
  
  
    
  
  
  
  monkey.collide(ground);
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnBanana() {
  
  if (World.frameCount % 60 === 0) {
    var banana = createSprite(400,320,40,10);
    var rand=random(260, 320);
    banana.y=rand;
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    obstacle.addAnimation("obstacle", obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 70;
    //add each obstacle to the group
   obstacleGroup.add(obstacle);
  }
    }
    
    