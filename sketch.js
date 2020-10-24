var monkey;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var BananaGroup;
var StoneGroup;
var score = 0;
var ground, invisibleGround, bananaImage, stoneImage;

function preload() {
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
}

function setup() {
 monkey = createSprite(50,320,20,50);
 monkey.addAnimation("monkey", monkey_running);
 monkey.scale = 0.2;
 monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
 invisibleGround = createSprite(200,385,400,5); 
 ground = createSprite(200,380,400,10);
 invisibleGround.visible = false;
 
 BananaGroup = createGroup();
 StoneGroup = createGroup();
}
 
function draw() {
  background("white");
  stroke("black");
  textSize(20);
  fill("black");
  score = score + Math.round(World.frameRate/60.5);
  text("Survival Time:" + score,110,82);
  
  if(gameState === PLAY)   
  {
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
      
    monkey.collide(invisibleGround);
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 320){
      monkey.velocityY = -16 ;
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;    

spawnStone();
spawnBanana();

    //End the game when trex is touching the obstacle
    if(StoneGroup.isTouching(monkey))
    {
      gameState = END;
    }
    if(monkey.isTouching(BananaGroup))
    {
      BananaGroup.destroyEach();
    }
  }
  
  else if(gameState === END) {
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    StoneGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    //set lifetime of the game objects so that they are never destroyed
    StoneGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    score = 0;
  }
  
  
  drawSprites();
}

function spawnStone() {
  if(World.frameCount % 300 === 0) {
    var stone = createSprite(400,350,10,40);
    stone.velocityX = - (6 + 3*score/100);
    
    //generate random obstacles
    
    stone.addImage(stoneImage);
    stone.setCollider("circle",0,0,30);
    
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.2;
    stone.lifetime = 70;
    //add each obstacle to the group
    StoneGroup.add(stone);
  }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (World.frameCount % 100 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    BananaGroup.add(banana);
    

 
  }
  
}



  




  
