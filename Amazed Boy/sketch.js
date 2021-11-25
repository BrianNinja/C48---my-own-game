const END = 0;
const PLAY = 1;
var boy , coinsGroup;
var rockGroup;
var life , gameState;
var score;
var flag = true;
var rock;

function preload(){
  coinImg = loadImage("./assets/Coins.png");
  bgImg = loadImage("./assets/Bg.jpeg");
  rockImg = loadImage("./assets/rocks.png");
  boyImg = loadImage("./assets/Boy.png");
  lifelost = loadSound("./assets/LifeLost.wav");
  CoinSnd = loadSound("./assets/coinsSound.wav");
  bgEnd = loadImage("./assets/gameOver.jpeg")
  backgroundsnd = loadSound("./assets/backgroundSnd.mp3");

}
 
function setup(){
  createCanvas(500,500);

  //CreateSprite
   boy = createSprite(250,420,20,20);
   boy.debug = true;
   boy.addImage(boyImg);
   boy.setCollider("rectangle",0,0,100,230)
   boy.scale = 0.5;
  
  //create edge sprites
  edges = createEdgeSprites();
  gameState = PLAY;
  rockGroup = new Group();
  coinsGroup = new Group();
  life = 3;
  score = 0;
}

function draw(){
  background(bgImg);
  text("Life : "+life,450,20)
  text("Score :"+score,20,20)
  



  if (gameState === PLAY){
    //make playing boy object move
  if (keyIsDown(RIGHT_ARROW)){
    boy.x += 10

  }   
  if (keyIsDown(LEFT_ARROW)){
    boy.x -= 10

  }
  //prevent the boy from moving out 
  if (boy.isTouching(edges[0])){
    boy.x = 60;
  }   
  if (boy.isTouching(edges[1])){
    boy.x = 440;

  }
   // spawn the obstacles 
   dropRocks();
   dropCoins();
   
   if (rockGroup.isTouching(boy)){
      //flag = false;
      //rockGroup.destroyEach();
      life = life -1;
      rockGroup[0].destroy();
      lifelost.play();
     
   }
   if (flag === false){
    life = life -1;
   }
   if (life === 0){
    gameState = END
    console.log("gameended"); 
  } 
 
   if (coinsGroup.isTouching(boy)){
     score += 10
     coinsGroup[0].destroy();
     CoinSnd.play();
  
   }
   drawSprites();   
  }
  if (gameState === END){
    background(bgEnd);
    
  }

  
  
  
 

 
}

function dropCoins(){

  if (frameCount%100===0){
    var coins = createSprite(Math.round(random(5,495)),0,20,20);
    coins.addImage(coinImg)
    coins.scale = 0.3
    coins.velocityY = 6;
    coinsGroup.add(coins);
    coins.lifetime = 70;
   
  }

}

function dropRocks(){
  if (frameCount%60===0){
    var rock = createSprite(Math.round(random(5,495)),0,30,30)
    rock.addImage(rockImg);
    rock.scale = 0.4;
    rock.velocityY = 5;
    rockGroup.add(rock);
    // time = distance 
    rock.lifetime = 120;
  }
  
}


