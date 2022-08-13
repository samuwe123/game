class OverworldMap {
    constructor(config){
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
    }
    drawLowerImage(ctx, cameraPerson){
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(7) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson){
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(7) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction){
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects(){
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];
            object.id = key;
            object.mount(this);
        })
    }

    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y){
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction){
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }
}
window.OverworldMaps = {
    casa1: {
        id: "casa1",
        lowerSrc: "./img/lugares/quarto1.png",
        upperSrc: "./img/lugares/quartoa1.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npcA: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                src: "/img/npc/SpriteSheet11.png",
                behaviorLoop: [
                    { type: "stand", direction: "left", time: 800 },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "stand", direction: "right", time: 1200 },
                    { type: "stand", direction: "up", time: 300 },
                ]
            }),
            npcB: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/img/npc/SpriteSheet14.png",
                behaviorLoop: [
                    { type: "walk", direction: "left" },
                    //{ type: "stand", direction: "up", time: 800 },
                    { type: "walk", direction: "up" },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "down" },
                ]
            }),
        },
        walls: {
            //"16,16": true
            [utils.asGridCoord(2,8)] : true,
            [utils.asGridCoord(3,8)] : true,
            [utils.asGridCoord(4,8)] : true,
            [utils.asGridCoord(2,9)] : true,
            [utils.asGridCoord(3,9)] : true,
            [utils.asGridCoord(4,9)] : true,
            [utils.asGridCoord(2,4)] : true,
            [utils.asGridCoord(3,4)] : true,
            [utils.asGridCoord(5,4)] : true,
            [utils.asGridCoord(6,4)] : true,
            [utils.asGridCoord(8,4)] : true,
            [utils.asGridCoord(9,4)] : true,
            [utils.asGridCoord(11,4)] : true,
            [utils.asGridCoord(13,5)] : true,
            [utils.asGridCoord(13,6)] : true,
            [utils.asGridCoord(13,6)] : true,
            [utils.asGridCoord(13,8)] : true,
            [utils.asGridCoord(13,9)] : true,
            [utils.asGridCoord(1,2)] : true,
            [utils.asGridCoord(1,3)] : true,
            [utils.asGridCoord(1,4)] : true,
            [utils.asGridCoord(1,5)] : true,
            [utils.asGridCoord(1,6)] : true,
            [utils.asGridCoord(1,7)] : true,
            [utils.asGridCoord(1,8)] : true,
            [utils.asGridCoord(1,9)] : true,
            [utils.asGridCoord(1,10)] : true,
            [utils.asGridCoord(2,2)] : true,
            [utils.asGridCoord(2,3)] : true,
            [utils.asGridCoord(2,4)] : true,
            [utils.asGridCoord(2,5)] : true,
            [utils.asGridCoord(2,6)] : true,
            [utils.asGridCoord(2,7)] : true,
            [utils.asGridCoord(2,8)] : true,
            [utils.asGridCoord(2,9)] : true,
            [utils.asGridCoord(2,10)] : true,
            [utils.asGridCoord(2,11)] : true,
            [utils.asGridCoord(3,11)] : true,
            [utils.asGridCoord(4,11)] : true,
            [utils.asGridCoord(5,11)] : true,
            [utils.asGridCoord(6,11)] : true,
            [utils.asGridCoord(9,11)] : true,
            [utils.asGridCoord(10,11)] : true,
            [utils.asGridCoord(11,11)] : true,
            [utils.asGridCoord(12,11)] : true,
            [utils.asGridCoord(13,11)] : true,
            [utils.asGridCoord(14,11)] : true,
            [utils.asGridCoord(15,11)] : true,
            [utils.asGridCoord(14,2)] : true,
            [utils.asGridCoord(14,3)] : true,
            [utils.asGridCoord(14,4)] : true,
            [utils.asGridCoord(14,5)] : true,
            [utils.asGridCoord(14,6)] : true,
            [utils.asGridCoord(14,7)] : true,
            [utils.asGridCoord(14,8)] : true,
            [utils.asGridCoord(14,9)] : true,
            [utils.asGridCoord(14,10)] : true,
            [utils.asGridCoord(14,11)] : true,
            [utils.asGridCoord(2,4)] : true,
            [utils.asGridCoord(3,4)] : true,
            [utils.asGridCoord(4,4)] : true,
            [utils.asGridCoord(5,4)] : true,
            [utils.asGridCoord(6,4)] : true,
            [utils.asGridCoord(7,4)] : true,
            [utils.asGridCoord(8,4)] : true,
            [utils.asGridCoord(9,4)] : true,
            [utils.asGridCoord(10,4)] : true,
            [utils.asGridCoord(11,4)] : true,
            [utils.asGridCoord(12,4)] : true,
            [utils.asGridCoord(13,4)] : true,
            [utils.asGridCoord(14,4)] : true,
            [utils.asGridCoord(2,3)] : true,
            [utils.asGridCoord(3,3)] : true,
            [utils.asGridCoord(4,3)] : true,
            [utils.asGridCoord(5,3)] : true,
            [utils.asGridCoord(6,3)] : true,
            [utils.asGridCoord(7,3)] : true,
            [utils.asGridCoord(8,3)] : true,
            [utils.asGridCoord(9,3)] : true,
            [utils.asGridCoord(10,3)] : true,
            [utils.asGridCoord(11,3)] : true,
            [utils.asGridCoord(12,3)] : true,
            [utils.asGridCoord(13,3)] : true,
            [utils.asGridCoord(14,3)] : true,
            [utils.asGridCoord(7,12)] : true,
            [utils.asGridCoord(7,11)] : true,
            [utils.asGridCoord(9,12)] : true,
            [utils.asGridCoord(10,11)] : true,
            [utils.asGridCoord(7,13)] : true,
            [utils.asGridCoord(8,13)] : true,
            
        }
    },
    casa2: {
        id: "casa2",
        lowerSrc: "./img/lugares/quarto2.png",
        upperSrc: "./img/lugares/quartob1.png",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 6,
            }),
            npcA: new GameObject({
                x: 9,
                y: 6,
                src: "/img/npc/SpriteSheet14.png"
            }),
            npcB: new GameObject({
                x: 7,
                y: 8,
                src: "/img/npc/SpriteSheet8.png"
            }),
        }
    },
}