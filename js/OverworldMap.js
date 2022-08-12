class OverworldMap {
    constructor(config){
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }
    drawLowerImage(ctx){
        ctx.drawImage(this.lowerImage, 0, 0)
    }
    drawUpperImage(ctx){
        ctx.drawImage(this.upperImage, 0, 0)
    }
}
window.OverworldMaps = {
    casa1: {
        id: "casa1",
        lowerSrc: "./img/lugares/quarto1.png",
        upperSrc: "./img/lugares/quarto1.png",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 6,
            }),
            npc1: new GameObject({
                x: 7,
                y: 9,
                src: "/img/npc/SpriteSheet14.png"
            })
        }
    },
    casa3: {
        id: "casa3",
        lowerSrc: "./img/lugares/quarto3.png",
        upperSrc: "./img/lugares/quarto3.png",
        gameObjects: {
            hero: new GameObject({
                x: 3,
                y: 5,
            }),
            npcA: new GameObject({
                x: 9,
                y: 6,
                src: "/img/npc/SpriteSheet14.png"
            }),
            npcB: new GameObject({
                x: 10,
                y: 4,
                src: "/img/npc/SpriteSheet8.png"
            }),
        }
    },
}