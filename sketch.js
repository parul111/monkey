var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
    
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(600,400);
  
  monkey=createSprite(50,160,20,50);
  monkey.addAnimation("moving",monkey_running);
  
  monkey.scale=0.2;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  
  obstaclesGroup=createGroup();
  foodGroup=createGroup();
    score=0;

  
}
  function spanObstacles(){
 if (frameCount % 360 === 0){
   var obstacle = createSprite(600,300,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   obstacle.addImage(obstacleImage);
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
  }





function draw() {
 background(backgroundImage);
  backgroundImage.velocityX=3;
  
    if(ground.x<0) {
    ground.x=ground.width/2;
  }
  monkey.collide(ground);
  
  //displaying score
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
   score = score + Math.round(getFrameRate()/60);
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY+=0.8;
  }
  if(monkey.isTouching(obstacle)){
    monkey.velocityX=0;
    ground.velocity=0;
    gameState=END;
  }

  drawSprites();
  spanObstacles();
}

