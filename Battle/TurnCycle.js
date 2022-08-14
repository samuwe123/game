class TurnCycle{
    constructor( { battle, onNewEvent } ){
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentTeam = "player"; //ou enemy
    }

    async turn(){

    }

    async init(){
        await this.onNewEvent({
            type: "textMessage",
            text: "A batalha está começando!"
        })

        //começo do 1 turno
        this.turn();

    }

}