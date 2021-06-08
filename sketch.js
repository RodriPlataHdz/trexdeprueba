var trex, trex_running, edges;
var groundImage;
var ground;
var invisibleground;
var cloudImg;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var score;
var GroupCloud;
var GroupObstacles;
var PLAY = 1;
var END = 0;
var GameStage = PLAY;
var trexcollide;
var GameOver;
var restart;
var GameOverImg;
var restartImg;

var jumpsound, diedsound, checkpointsound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcollide = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  cloudImg = loadImage("cloud.png");
  GameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpsound = loadSound("jump.mp3");
  diedsound = loadSound("die.mp3");
  checkpointsound = loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200);
  
  //crea el Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexcollide);
  edges = createEdgeSprites();
  ground = createSprite(200,190,600,10);
  ground.addImage(groundImage);
  invisibleground = createSprite(200,197,600,10);
  invisibleground.visible = false;
  GameOver = createSprite(300,50,50,50);
  GameOver.addImage(GameOverImg);
  restart = createSprite(300,80,50,50);
  restart.addImage(restartImg);
  GameOver.scale = 0.50;
  restart.scale = 0.40;
  GameOver.visible = false;
  restart.visible = false;
  
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  trex.setCollider("circle", 0, 0, 50);
  trex.debug = false;
  
  score = 0;
  
  GroupCloud = new Group();
  GroupObstacles = new Group();
  
}


function draw(){
  //establece un color de fondo 
  background("blue");
  
  text("score: "+score, 500, 50);
  
  if(GameStage === PLAY){ 
    if(keyDown("space") && trex.y>=160){
    trex.velocityY = -12;
      jumpsound.play();
     }
      trex.velocityY = trex.velocityY + 0.5;
     ground.velocityX = -3;
  if(ground.x < 0){
     ground.x = ground.width/2;
    ground.velocityX = -3
  
     }
   score = score + Math.round(getFrameRate()/60);
     if(score > 0 && score % 100 === 0){
         checkpointsound.play();
         }
    spawnclouds();
  spawnobstacles();
    if(GroupObstacles.isTouching(trex)){
    GameStage = END;
      diedsound.play();
      
    
      
    }
  }
  else if(GameStage === END){
          ground.velocityX = 0;
    GroupObstacles.setVelocityXEach(0);
    GroupCloud.setVelocityXEach(0);
    trex.changeAnimation("collided", trexcollide);
    GroupObstacles.setLifetimeEach(-1);
    GroupCloud.setLifetimeEach(-1);
    trex.velocityY = 0;
    GameOver.visible = true;
  restart.visible = true;
          }
  

  
  //evita que el Trex caiga
  trex.collide(edges[3])
  trex.collide(invisibleground)
  
  if(mousePressedOver(restart)){
   reset(); 
  }
  
  
  drawSprites();
}

function spawnclouds(){

  if(frameCount  % 60 === 0){
     cloud = createSprite(600,50,50,20); 
cloud.velocityX = -3;
    cloud.addImage(cloudImg);
    cloud.y = Math.round(random(10,80));
    cloud.depth = trex.depth  -2;
    cloud.lifetime = 200;
    
    GroupCloud.add(cloud);
    
     }
}
  
  function spawnobstacles(){
   
    
   if(frameCount  % 100 === 0){
     obstacle = createSprite(600,170,50,20); 
     obstacle.velocityX = -(3 + score/100);
    obstacle.depth = trex.depth  -2;
    obstacle.lifetime = 200;
     obstacle.scale = 0.60;
     var rand = Math.round(random(1,6));
     switch(rand){
       case 1: obstacle.addImage(obstacle1);
         break;
         case 2: obstacle.addImage(obstacle2);
         break;
         case 3: obstacle.addImage(obstacle3);
         break;
         case 4: obstacle.addImage(obstacle4);
         break;
         case 5: obstacle.addImage(obstacle5);
         break;
         case 6: obstacle.addImage(obstacle6);
         break;
         
      
           }
  GroupObstacles.add(obstacle);
   
   }
    
  
  
}

function reset(){
 GameStage = PLAY;      
 score = 0;
  trex.changeAnimation("running", trex_running);
GameOver.visible = false;
  restart.visible = false;
   GroupObstacles.destroyEach();
    GroupCloud.destroyEach();
    }