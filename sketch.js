var canvas, backgroundImage;

var gameState = 0;
var playerCount = 0;
var allPlayers;
var distance = 0;
var xPosition = 0;
var database;
var p;

var form, player, game;

var ships, spaceship,spaceship2,alieni, aliens;
var alien1, alien2, alien3, shipImage;

function preload(){
  alien1=loadImage("images/alien1.png");
  alien2=loadImage("images/alien2.png");
  alien3=loadImage("images/alien3.png");
  shipImage=loadImage("images/spaceship.png");
  ship2Image=loadImage("images/spaceship2.png");
  
  
  backgroundImage=loadImage("images/background.png");
}



function setup(){
  canvas = createCanvas(displayWidth, displayHeight);
  background ("white");
  database = firebase.database();
  game = new Game();
  game.getGameState();  
  game.start();
  aliens = new Group();
  
}


function draw(){
  
  if(playerCount === 2){
    game.updateGameState(1);
    
  }
  if(gameState === 1){
    clear();
    game.play();
    distance = distance + Math.round(getFrameRate()/60);
    
    
  }
  if(gameState===2){
    game.end();
  }
   
  /*if(gameState === 3){
    text("Game Over");
    textSize(50);
    fill("white");
    
 }*/
}

