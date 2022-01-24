class Game{
    constructor(){    
        //this.ending = createElement('h2');
    }

    getGameState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",(data)=>{
            gameState = data.val();
        });
    }
    
    updateGameState(state){
        var gameStateRef = database.ref("/");
        gameStateRef.update({
            gameState:state
        });
    }


    async start(){
        if(gameState === 0){
           
            if(playerCount === 0){
                player = new Player(displayWidth/2 - 200);
                 player.getPlayerCount();
            }
            else{
                player = new Player(displayWidth/2 + 200);
                player.getPlayerCount();
            }
            
            /*var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getPlayerCount();
            }*/
            
            form = new Form();
            form.display();
        }
       spaceship = createSprite(300,600);
       spaceship.addImage("spaceship", shipImage);
       spaceship.scale=0.5;
       //spaceship.velocityY = -7;

       spaceship2 = createSprite(800,600);
       spaceship2.addImage("spaceship2", ship2Image);
       spaceship2.scale=0.7;
       //spaceship2.velocityY = -7;

       ships = [spaceship, spaceship2];

       
    }

    play(){

        Player.getPlayerInfo();
        background(0);
        form.hide();
        image(backgroundImage, 0, -displayHeight*4, displayWidth, displayHeight*5);
           textSize(30);
           fill("red");
           text("Game Starts", 120, 100)
           textSize(20);
           fill("red");
            text("Score: " + distance,500, 100)
            
        

        var y;
        var x = 175;

        var index = 0;

        for(var plr in allPlayers){

          index = index + 1;


          /*if(allPlayers[plr].xPosition === 0){
           x = x + 200;
           player.updateData();
          }
          else{
           x = allPlayers[plr].xPosition;
          }*/
          
          x = allPlayers[plr].xPosition;  
          y = displayHeight - allPlayers[plr].distance;  
          ships[index-1].x = x;
          ships[index-1].y = y;
        
    

            if(index === player.index){
                stroke(10);
                fill("red");
                ellipse(ships[index-1].x,ships[index-1].y,60,60);
                camera.position.x = displayWidth/2;
                camera.position.y = ships[index-1].y;
               
            }
        
                
              
        }
        if(keyDown(UP_ARROW)  ){
            //player.velocityX = 5;
            //console.log("äaaaaaa");
            player.distance+=5
            player.updateData();


            
            
        }

        if(keyDown(LEFT_ARROW)){
            if(player.xPosition>20){
                player.xPosition -= 5;    
            }
            player.updateData();
        }

        if(keyDown(RIGHT_ARROW)){
            if(player.xPosition<displayWidth - 20){
                player.xPosition += 5;    
            }
            player.updateData();
        }

        
         this.spawnAliens();
         this.touchingAliens(player.index);
         if(player.distance>3700){
            gameState=2;
          }


          drawSprites();         
          }

          
          spawnAliens(){
              //console.log("aliens")
            if(frameCount%60 === 0){
              alieni = createSprite(500, -displayHeight*4 - 10, 50, 50);
              alieni.scale=0.5;
              alieni.velocityY = 7;
              alieni.x = Math.round(random(10, displayWidth - 200));
              
              var rand = Math.round(random(1,3));
              if(rand === 1){
                alieni.addImage(alien1);
              }
              if(rand === 2){
                alieni.addImage(alien2);
              }
        
              if(rand === 3){
                alieni.addImage(alien3);
              }
              aliens.add(alieni);
              
              /*if(alieni.x & alieni.y === player.x & player.y){
                  alieni.velocityY=0;
                  text("Game over", displayWidth/2, displayHeight/2);
                  textSize(20);
                  fill("red");
              }*/
              
            }
           
            }
            touchingAliens(playerIndex){
                //if(aliens.isTouching(ships[playerIndex-1])){
                    //console.log("Touching")
                    
                    for(var i = 0; i <aliens.length; i++){
                        if(ships[playerIndex-1].isTouching(aliens.get(i))){
                            aliens.get(i).destroy();
                            if(player.lives>0){
                                player.lives = player.lives - 1;
                            }
                            else{
                                this.end();
                            }
                            if(player.lives === 0){
                                player.destroy();
                                textSize(30);
                                fill("white");
                                text("Game Over", player.xPosition, player.distance)
                            }
                        }
                    }

                    
                    player.updateData();
                //}

            }
            end(){
                console.log("Game Ended");
               alieni.velocityY=0;
             
                
              }
   
        }
    
        
        
