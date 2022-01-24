class Form{
    constructor(){
        this.title = createElement("h2");
        this.input = createInput("Name");
        this.greeting = createElement("h3");
        this.button = createButton("Play");
        this.reset = createButton("Reset");
    }
    hide(){
        this.title.hide();
        this.input.hide();
        this.greeting.hide();
        this.button.hide();
        
    }
        
    display(){
        this.title.html("Space Warfare");
        this.title.position(displayWidth/2-50,40);
        this.reset.position(displayWidth - 100, 50);
        this.button.position(displayWidth/2+30,displayHeight/2);
        this.input.position(displayWidth/2-40,displayHeight/2-80);

        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();      
            player.name = this.input.value(); 
            playerCount += 1;
            player.index = playerCount;

            player.updateData();
            player.updatePlayerCount(playerCount);

            this.greeting.html("Hello " + player.name);
            this.greeting.position(displayWidth/2 - 70, displayHeight/4);
        });

        
        this.reset.mousePressed(()=>{
            player.updatePlayerCount(0);
            game.updateGameState(0);
            //Player.updateCarsAtEnd(0);
            var playerInfoRef = database.ref('players');
            playerInfoRef.remove(0);
            form.display();
          });
    }


}