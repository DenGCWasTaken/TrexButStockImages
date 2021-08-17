var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage, cloudsGroup;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle, obstaclesGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart,gameOverImage,restartImage;
var jumpSound, dieSound, checkPointSound;
// var magic;

function preload(){
  trex_running = loadAnimation("Trex.png.png","Another Trex.png.png");
  trex_collided = loadImage("He's dead.png");
  
  groundImage = loadImage("ground2.png");
   gameOverImage= loadImage("gameOver.png");
   restartImage= loadImage("restart.png");
  
  cloudImage = loadImage("MMM Cloud.png");
  obstacle1 = loadImage("no.png");
  obstacle2 = loadImage("time.png");
  obstacle3 = loadImage("to.png");
  obstacle4 = loadImage("explain.png");
  obstacle5 = loadImage("grab.png");
  obstacle6 = loadImage("a cactus.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");

}

function setup() {

  createCanvas(600,200)
  
  trex = createSprite(50,160,20,60);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  trex.setCollider("rectangle",0,0,160,100);
  trex.debug = true;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;


  gameOver = createSprite(300,30,0,0);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale = 0.6;
  gameOver.visible = false;

  restart = createSprite(300,100,0,0);
  restart.addImage("restart",restartImage);
  restart.scale = 0.6
  restart.visible = false;
 
obstaclesGroup = new Group();
cloudsGroup = new Group();

}

function draw() {

  background("white");
  

  if (gameState==PLAY){
  score=score+Math.round(getFrameRate()/60);
  if (score>0 && score % 100==0){
  checkPointSound.play();
  }

  trex.changeAnimation("running",trex_running);
  
   ground.velocityX = -10;
  
   if(keyDown("space")&& trex.isTouching(ground)) {
   trex.velocityY = -13.5;
   jumpSound.play();
   }

    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
     spawnObstacles();
     spawnClouds();

  if(obstaclesGroup.isTouching(trex)){
  gameState=END;
  dieSound.play();
  
  }
  }
  
  if(gameState==END){
  trex.velocityY=0;
  ground.velocityX=0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

  gameOver.visible = true;
  restart.visible = true;

  trex.changeAnimation("collided",trex_collided)

  if(keyDown("space")){
  reset();
  }

  }
  
  text(score,570,10);
  
  trex.collide(invisibleGround);

  drawSprites();
  
}

function spawnClouds() {

 if (frameCount%70==0){
   var clouds=createSprite(600,100,40,10);
   clouds.addImage("cloud",cloudImage);
   clouds.depth=trex.depth;
   trex.depth=trex.depth+1
   clouds.scale=0.25;
   clouds.y=Math.round(random(10,70));
   clouds.lifetime=230;
   clouds.velocityX=-3;
   cloudsGroup.add(clouds);
 }

}

function spawnObstacles() {
 if (frameCount%150==0){
 obstacle = createSprite(600,165,10,40);
 obstacle.scale = 0.25;
 obstacle.velocityX = -10;
 var rand = Math.round(random(1,6));
 switch(rand){
   case 1 : obstacle.addImage(obstacle1);
   break;
   case 2 : obstacle.addImage(obstacle2);
   break;
   case 3 : obstacle.addImage(obstacle3);
   break;
   case 4 : obstacle.addImage(obstacle4);
   break;
   case 5 : obstacle.addImage(obstacle5);
   break;
   case 6 : obstacle.addImage(obstacle6);
   break;
   default : break;
   }
 obstacle.lifetime=200;
 obstaclesGroup.add(obstacle);
 }
}

function reset() {
 obstaclesGroup.destroyEach(0);
 cloudsGroup.destroyEach(0);
 score = 0;
 gameOver.visible = false;
 restart.visible = false;
 gameState=PLAY;
}