class Player{
    constructor(xPos){
        this.name = null;
        this.distance = 0;
        this.index = null;
        this.lives = 3;
        this.xPosition=xPos;
    }

    getPlayerCount(){
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value",(data)=>{
            playerCount = data.val();
        });
    }
    
    updatePlayerCount(count){
        var playerCountRef = database.ref("/");
        playerCountRef.update({
            playerCount:count
        });
    }

    updateData(){
        var playerInfoRef = database.ref('players/player' + this.index);
        playerInfoRef.set({
            name: this.name,
            distance: this.distance,
            lives: this.lives,
            xPosition: this.xPosition
        })
    }

    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val()
    });
    }
    
}