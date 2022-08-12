class Overworld{
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop(){
        const step = () => {

            //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.map.drawUpperImage(this.ctx);

            Object.values(this.map.gameObjects).forEach(object => {
                //object.x += 0.02;
                object.sprite.draw(this.ctx);
            })

            this.map.drawLowerImage(this.ctx);

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init(){
        this.map = new OverworldMap(window.OverworldMaps.casa3);
        this.startGameLoop();


        
    }
}