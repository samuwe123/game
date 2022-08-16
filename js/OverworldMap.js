class OverworldMap {
    constructor(config) {
      this.overworld = null;
      this.gameObjects = config.gameObjects;
      this.cutsceneSpaces = config.cutsceneSpaces || {};
      this.walls = config.walls || {};
  
      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
  
      this.isCutscenePlaying = false;
    }
  
    drawLowerImage(ctx, cameraPerson) {
      ctx.drawImage(
        this.lowerImage, 
        utils.withGrid(7) - cameraPerson.x, 
        utils.withGrid(6) - cameraPerson.y
        )
    }
  
    drawUpperImage(ctx, cameraPerson) {
      ctx.drawImage(
        this.upperImage, 
        utils.withGrid(7) - cameraPerson.x, 
        utils.withGrid(6) - cameraPerson.y
      )
    } 
  
    isSpaceTaken(currentX, currentY, direction) {
      const {x,y} = utils.nextPosition(currentX, currentY, direction);
      return this.walls[`${x},${y}`] || false;
    }
  
    mountObjects() {
      Object.keys(this.gameObjects).forEach(key => {
  
        let object = this.gameObjects[key];
        object.id = key;
  
        //TODO: determine if this object should actually mount
        object.mount(this);
  
      })
    }
  
    async startCutscene(events) {
      this.isCutscenePlaying = true;
  
      for (let i=0; i<events.length; i++) {
        const eventHandler = new OverworldEvent({
          event: events[i],
          map: this,
        })
        await eventHandler.init();
      }
  
      this.isCutscenePlaying = false;
  
      //Reset NPCs to do their idle behavior
      Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    }
  
    checkForActionCutscene() {
      const hero = this.gameObjects["hero"];
      const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
      const match = Object.values(this.gameObjects).find(object => {
        return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
      });
      if (!this.isCutscenePlaying && match && match.talking.length) {
        this.startCutscene(match.talking[0].events)
      }
    }
  
    checkForFootstepCutscene() {
      const hero = this.gameObjects["hero"];
      const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
      if (!this.isCutscenePlaying && match) {
        this.startCutscene( match[0].events )
      }
    }
  
    addWall(x,y) {
      this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
      delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction) {
      this.removeWall(wasX, wasY);
      const {x,y} = utils.nextPosition(wasX, wasY, direction);
      this.addWall(x,y);
    }
  
  }
  
  window.OverworldMaps = {
    start: {
      lowerSrc: "./img/lugares/start.png",
      upperSrc: "./img/lugares/start1.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(7),
        }),
        npcA: new Person({
          x: utils.withGrid(5),
          y: utils.withGrid(6),
          src: "/img/npc/SpriteSheet7.png",
          talking: [
            {
              events: [
                { type: "textMessage", text: "O mundo está em perigo...", faceHero: "npcA" },
                { type: "textMessage", text: "Você é o único que pode salvar a todos!"},
                { type: "textMessage", text: "Derrote todos os monstros!"},
                { type: "textMessage", text: "Vamos lá!"},
                {      
                    type: "changeMap", 
                    map: "quarto1",
                    x: utils.withGrid(7),
                    y: utils.withGrid(3),
                    direction: "down"
                }
              ]
            }
          ]
        }),
        npcB: new Person({
            x: utils.withGrid(8),
            y: utils.withGrid(7),
            src: "/img/npc/SpriteSheet8.png",
            talking: [
              {
                events: [
                  { type: "textMessage", text: "Créditos..."},
                  { type: "textMessage", text: "Jogo feito por Samuel Augusto!"},
                  { type: "textMessage", text: "Der seu feedback a ele."},
                ]
              }
            ]
        }),
        npcC: new Person({
          x: utils.withGrid(3),
          y: utils.withGrid(4),
          src: "/img/npc/SpriteSheet11.png",
          talking: [
            {
              events: [
                { type: "textMessage", text: "Olá!", faceHero: "npcC" },
                { type: "battle", enemyId: "m1" }
              ]
            }
          ]
      }),
    },
    walls: {
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
        [utils.asGridCoord(1,12)] : true,
        [utils.asGridCoord(2,12)] : true,
        [utils.asGridCoord(3,12)] : true,
        [utils.asGridCoord(4,12)] : true,
        [utils.asGridCoord(5,12)] : true,
        [utils.asGridCoord(6,12)] : true,
        [utils.asGridCoord(7,12)] : true,
        [utils.asGridCoord(8,12)] : true,
        [utils.asGridCoord(9,12)] : true,
        [utils.asGridCoord(10,12)] : true,
        [utils.asGridCoord(11,12)] : true,
        [utils.asGridCoord(10,1)] : true,
        [utils.asGridCoord(10,2)] : true,
        [utils.asGridCoord(10,3)] : true,
        [utils.asGridCoord(10,4)] : true,
        [utils.asGridCoord(10,5)] : true,
        [utils.asGridCoord(10,6)] : true,
        [utils.asGridCoord(10,7)] : true,
        [utils.asGridCoord(10,8)] : true,
        [utils.asGridCoord(10,9)] : true,
        [utils.asGridCoord(10,10)] : true,
        [utils.asGridCoord(10,11)] : true,
        [utils.asGridCoord(2,3)] : true,
        [utils.asGridCoord(3,3)] : true,
        [utils.asGridCoord(4,3)] : true,
        [utils.asGridCoord(5,3)] : true,
        [utils.asGridCoord(6,3)] : true,
        [utils.asGridCoord(7,3)] : true,
        [utils.asGridCoord(8,3)] : true,
        [utils.asGridCoord(9,3)] : true,
        [utils.asGridCoord(7,5)] : true,
        [utils.asGridCoord(8,5)] : true,
        [utils.asGridCoord(9,5)] : true,
        [utils.asGridCoord(7,6)] : true,
        [utils.asGridCoord(7,7)] : true,
        [utils.asGridCoord(7,8)] : true,
        [utils.asGridCoord(9,6)] : true,
        [utils.asGridCoord(9,7)] : true,
        [utils.asGridCoord(9,8)] : true,
    },
    cutsceneSpaces: {
        [utils.asGridCoord(8,9)]: [
          {
            events: [
                { type: "textMessage", text: "Créditos..."},
                { type: "textMessage", text: "Jogo feito por Samuel Augusto!"},
                { type: "textMessage", text: "Der seu feedback a ele."},
            ]
          }
        ],
        [utils.asGridCoord(6,7)]: [
            {
              events: [
                  { who: "npcB", type: "stand",  direction: "left", time: 500 },
                  { type: "textMessage", text: "Créditos..."},
                  { type: "textMessage", text: "Jogo feito por Samuel Augusto!"},
                  { type: "textMessage", text: "Der seu feedback a ele."},
                  { who: "npcB", type: "stand",  direction: "down", time: 500 },
              ]
            }
          ],
    },
    },
    quarto1: {
      lowerSrc: "./img/lugares/quarto1.png",
      upperSrc: "./img/lugares/quartoa1.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(8),
          y: utils.withGrid(7),
        }),
        npcA: new Person({
          x: utils.withGrid(9),
          y: utils.withGrid(7),
          src: "/img/npc/SpriteSheet8.png",
          talking: [
            {
              events: [
                { type: "textMessage", text: "O mundo está em perigo...", faceHero: "npcA" },
                { type: "textMessage", text: "Como você é um ninja supremo da classe SS!"},
                { type: "textMessage", text: "Derrote todos os monstros!"},
                { type: "textMessage", text: "Vamos lá!"},
                { who: "hero", type: "walk",  direction: "down" },
              ]
            }
          ]
        }),
        npcB: new Person({
          x: utils.withGrid(10),
          y: utils.withGrid(10),
          src: "/img/npc/SpriteSheet11.png",
          // behaviorLoop: [
          //   { type: "walk",  direction: "left" },
          //   { type: "stand",  direction: "up", time: 800 },
          //   { type: "walk",  direction: "up" },
          //   { type: "walk",  direction: "right" },
          //   { type: "walk",  direction: "down" },
          // ]
        }),
      }, 
      walls: {
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
            
      },
      cutsceneSpaces: { 
        [utils.asGridCoord(8,9)]: [
          {
            events: [
              { who: "npcB", type: "walk",  direction: "left" },
              { who: "npcB", type: "walk",  direction: "left" },
              { who: "npcB", type: "stand",  direction: "up", time: 500 },
              { type: "textMessage", text:"Não passe por aqui!"},
              { type: "textMessage", text:"Fale com o instrutor acima!"},
              { who: "npcB", type: "walk",  direction: "right" },
              { who: "npcB", type: "walk",  direction: "right" },
              { who: "npcB", type: "stand",  direction: "down", time: 500 },
              { who: "hero", type: "walk",  direction: "up" },
            ]
          }
        ],
          [utils.asGridCoord(7,10)]: [
            /*{
            events: [
                { who: "npcB", type: "walk",  direction: "left" },
                { who: "npcB", type: "walk",  direction: "left" },
                { who: "npcB", type: "stand",  direction: "left", time: 500 },
                { type: "textMessage", text:"Não passe por aqui!"},
                { type: "textMessage", text:"Fale com o instrutor acima!"},
                { who: "npcB", type: "walk",  direction: "right" },
                { who: "npcB", type: "walk",  direction: "right" },
                { who: "npcB", type: "stand",  direction: "down", time: 500 },
                { who: "hero", type: "walk",  direction: "up" },
            ]
          } */
        ], 
        [utils.asGridCoord(5,8)]: [
          {
            events: [
              { type: "changeMap", map: "quarto2" }
            ]
          }
        ]
      }
    
    },
    quarto2: {
      lowerSrc: "/img/lugares/quarto2.png",
      upperSrc: "/img/lugares/quartob1.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(5),
        }), /*
        npcB: new Person({
          x: utils.withGrid(10),
          y: utils.withGrid(8),
          src: "/img/npc/SpriteSheet14.png",
          talking: [
            {
              events: [
                { type: "textMessage", text: "You made it!", faceHero:"npcB" },
              ]
            }
          ]
        }) */
      }
    },
  }