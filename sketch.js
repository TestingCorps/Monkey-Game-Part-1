var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

var survivalTime = 0;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas = (800, 800);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(225);

  ground.x = ground.width / 2;

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 100,50);
  

  monkey.collide(ground);
  
  
  if (gameState===PLAY){
    survivalTime += Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if (keyDown("space") && monkey.y >= 313) {
      monkey.velocityY = -12;
    } 
  
    monkey.velocityY += 0.5;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      score += 1;
    }
  
    spawnFood();
    spawnRock();
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  

  
  drawSprites();
}

function spawnFood() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(140, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -4;

    banana.lifetime = 155;
    
    banana.depth = monkey.depth;
    monkey.depth += 1;
    banana.scale = 0.08;

    FoodGroup.add(banana);
  }

}

function spawnRock() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 120, 40, 10);
    obstacle.y = 315;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;

    obstacle.lifetime = 155;

    obstacle.depth = monkey.depth;
    monkey.depth += 1;
    obstacle.setCollider("circle",0,0,220);

    
    obstacleGroup.add(obstacle);
  }

}