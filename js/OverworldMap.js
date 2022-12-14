class OverworldMap {
    constructor(config) {
      this.overworld = null;
      this.gameObjects = {};
      this.ConfigObjects = config.ConfigObjects;

      this.cutsceneSpaces = config.cutsceneSpaces || {};
      this.walls = config.walls || {};
  
      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
  
      this.isCutscenePlaying = false;
      this.isPaused = false;
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
      if (this.walls[`${x},${y}`]) {
        return true;
      }
      return Object.values(this.gameObjects).find(obj => {
        if (obj.x === x && obj.y === y) { return true; }
        if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y ) {
          return true;
        }
        return false;
      })
    }
  
    mountObjects() {
      Object.keys(this.ConfigObjects).forEach(key => {
  
        let object = this.ConfigObjects[key];
        object.id = key;

        let instance;
        if (object.type === "Person") {
            instance = new Person(object);
          }
          if (object.type === "PizzaStone") {
            instance = new PizzaStone(object);
          }
          this.gameObjects[key] = instance;
          this.gameObjects[key].id = key;
          instance.mount(this);
  
      })
    }
  
    async startCutscene(events) {
      this.isCutscenePlaying = true;
  
      for (let i=0; i<events.length; i++) {
        const eventHandler = new OverworldEvent({
          event: events[i],
          map: this,
        })
        const result = await eventHandler.init();
        if (result === "LOST_BATTLE"){
          break;
        }
      }
  
      this.isCutscenePlaying = false;
  
      //Reset NPCs to do their idle behavior
    }
  
    checkForActionCutscene() {
      const hero = this.gameObjects["hero"];
      const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
      const match = Object.values(this.gameObjects).find(object => {
        return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
      });
      if (!this.isCutscenePlaying && match && match.talking.length) {

        const relevantScenario = match.talking.find(scenario => {
          return (scenario.required || []).every(sf => {
            return playerState.storyFlags[sf]
          })
        })
        relevantScenario && this.startCutscene(relevantScenario.events)
      }
    }
  
    checkForFootstepCutscene() {
      const hero = this.gameObjects["hero"];
      const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
      if (!this.isCutscenePlaying && match) {
        this.startCutscene( match[0].events )
      }
    }
  }
  
  window.OverworldMaps = {
    start: {
      id: "start",
      lowerSrc: "./img/lugares/start.png",
      upperSrc: "./img/lugares/start1.png",
      ConfigObjects: {
        hero: {
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(7),
        },
        npcA:{
          type: "Person",
          x: utils.withGrid(5),
          y: utils.withGrid(6),
          src: "/img/npc/SpriteSheet7.png",
          talking: [
            {
              events: [
                { type: "textMessage", text: "Space para interagir e Enter para abrir menu", faceHero: "npcA" },
                { type: "textMessage", text: "O mundo est?? em perigo...", faceHero: "npcA" },
                { type: "textMessage", text: "Voc?? ?? o ??nico que pode salvar a todos!"},
                { type: "textMessage", text: "Derrote todos os monstros!"},
                { type: "textMessage", text: "Vamos l??!"},
                { type: "addStoryFlag", flag: "TUTORIAL"},
                {      
                    type: "changeMap", 
                    map: "quarto1",
                    x: utils.withGrid(8),
                    y: utils.withGrid(6),
                    direction: "down"
                }
              ]
            }
          ]
        },
        npcB:{
            type: "Person",
            x: utils.withGrid(8),
            y: utils.withGrid(7),
            src: "/img/npc/SpriteSheet8.png",
            talking: [
              {
                events: [
                  { type: "textMessage", text: "Cr??ditos..."},
                  { type: "textMessage", text: "Jogo feito por Samuel Augusto!"},
                  { type: "textMessage", text: "Der seu feedback a ele."},
                ]
              }
            ]
        }, /*
        npcC: new Person({
          x: utils.withGrid(3),
          y: utils.withGrid(4),
          src: "/img/npc/SpriteSheet11.png",
          talking: [
            {
              required: ["FALAR_COM_COISINHA"],
              events: [
                { type: "textMessage", text: "Muito bem!", faceHero: "npcC" }
              ]
            },
            {
              events: [
                { type: "textMessage", text: "Que isso?", faceHero: "npcC" },
                { type: "battle", enemyId: "m1" },
                { type: "addStoryFlag", flag: "DERROTE_M1"},
                { type: "textMessage", text: "Como eu perdi?", faceHero: "npcC" },
              ]
            }
          ]
      }), */
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
                { type: "textMessage", text: "Cr??ditos..."},
                { type: "textMessage", text: "Jogo feito por Samuel Augusto!"},
                { type: "textMessage", text: "Der seu feedback a ele."},
            ]
          }
        ],
        [utils.asGridCoord(6,7)]: [
            {
              events: [
                  { who: "npcB", type: "stand",  direction: "left", time: 500 },
                  { type: "textMessage", text: "Cr??ditos..."},
                  { type: "textMessage", text: "Jogo feito por Samuel Augusto!"},
                  { type: "textMessage", text: "Der seu feedback a ele."},
                  { who: "npcB", type: "stand",  direction: "down", time: 500 },
              ]
            }
          ],
    },
    },
    quarto1: {
      id: "quarto1",
      lowerSrc: "./img/lugares/quarto1.png",
      upperSrc: "./img/lugares/quartoa1.png",
      ConfigObjects: {
        hero:{
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(8),
          y: utils.withGrid(7),
        },/*
        npcA: new Person({
          x: utils.withGrid(9),
          y: utils.withGrid(7),
          src: "/img/npc/SpriteSheet8.png",
          talking: [
            {
              events: [
                { type: "textMessage", text: "O mundo est?? em perigo...", faceHero: "npcA" },
                { type: "textMessage", text: "Como voc?? ?? um ninja supremo da classe SS!"},
                { type: "textMessage", text: "Derrote todos os monstros!"},
                { type: "textMessage", text: "Vamos l??!"},
                { who: "hero", type: "walk",  direction: "down" },
              ]
            }
          ]
        }),*/
        //npcB: new Person({
          //x: utils.withGrid(10),
          //y: utils.withGrid(10),
          //src: "/img/npc/SpriteSheet11.png",
          // behaviorLoop: [
          //   { type: "walk",  direction: "left" },
          //   { type: "stand",  direction: "up", time: 800 },
          //   { type: "walk",  direction: "up" },
          //   { type: "walk",  direction: "right" },
          //   { type: "walk",  direction: "down" },
          // ]
        //}),
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
        [utils.asGridCoord(8,12)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "fallarden",
                x: utils.withGrid(6),
                y: utils.withGrid(6),
                direction: "down"
              }
            ]
          },
        ]
      }
    },    
    quarto2: {
      id: "quarto2",
      lowerSrc: "./img/lugares/quarto2.png",
      upperSrc: "./img/lugares/quartob1.png",
      ConfigObjects: {
        hero: {
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(8),
          y: utils.withGrid(9),
        },
        npcA: {
          type: "Person",
          x: utils.withGrid(10),
          y: utils.withGrid(9),
          src: "/img/npc/SpriteSheet8.png",
          talking: [
            {
              required: ["CONVERSAR_COM_PAIS"],
              events: [
                { type: "textMessage", text: "Muito bem! Irei te acompanhar", faceHero: "npcA" },
                { type: "addStoryFlag", flag: "CONVERSOU_COM_PAIS" },
              ]
            },
            {
              events: [
                { type: "textMessage", text: "Eai velho amigo! Faz tanto tempo que n??o te vejo!", faceHero:"npcA" },
                { type: "textMessage", text: "O mundo est?? perigoso muitos monstros por ai!"},
                { type: "textMessage", text: "Posso te ajudar nessa jornada, mas ter?? que conversar com meus pais!"},
              ]
            }
          ]
        },
        pizzaStone: {
          type: "PizzaStone",
          x: utils.withGrid(5),
          y: utils.withGrid(9),
          storyFlag: "USED_PIZZA_STONE",
          pizzas: ["Friend"],
        },
      },
        cutsceneSpaces: { 
          [utils.asGridCoord(8,12)]: [
            {
              events: [
                {
                  type: "changeMap",
                  map: "fallarden",
                  x: utils.withGrid(11),
                  y: utils.withGrid(6),
                  direction: "down"
                }
              ]
            },
          ]
        } /*
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
    },
    fallarden:{
      id: "fallarden",
      lowerSrc: "./img/lugares/fallarden-town.png",
      upperSrc: "./img/lugares/fallarden-town1.png",
      ConfigObjects: {
        hero: {
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(8),
          y: utils.withGrid(8),
        }
      },
      cutsceneSpaces:{
        [utils.asGridCoord(6,5)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "quarto1",
                x: utils.withGrid(8),
                y: utils.withGrid(12),
                direction: "up"
              }
            ]
          }
        ],
        [utils.asGridCoord(11,5)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "quarto2",
                x: utils.withGrid(8),
                y: utils.withGrid(12),
                direction: "up"
              }
            ]
          }
        ],
        [utils.asGridCoord(7,12)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "quarto3",
                x: utils.withGrid(8),
                y: utils.withGrid(12),
                direction: "up"
              }
            ]
          }
        ],
        [utils.asGridCoord(3,12)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "quarto4",
                x: utils.withGrid(8),
                y: utils.withGrid(12),
                direction: "up"
              }
            ]
          }
        ],
        [utils.asGridCoord(16,5)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "loja",
                x: utils.withGrid(8),
                y: utils.withGrid(12),
                direction: "up"
              }
            ]
          }
        ],
        [utils.asGridCoord(12,12)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "marshall1",
                x: utils.withGrid(9),
                y: utils.withGrid(14),
                direction: "up"
              }
            ]
          }
        ],
      }
    },
    quarto3:{
      id: "quarto3",
      lowerSrc: "./img/lugares/quarto3.png",
      upperSrc: "./img/lugares/quartoa3.png",
      ConfigObjects: {
        hero: {
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(8),
          y: utils.withGrid(8),
        },
        npcA: {
          type: "Person",
          x: utils.withGrid(6),
          y: utils.withGrid(7),
          src: "/img/npc/SpriteSheet9.png",
          talking: [
            {
              required: ["CONVERSOU_COM_PAIS"],
              events: [
                { type: "textMessage", text: "boa sorte para suas jornadas!", faceHero: "npcA" },
              ]
            },
            {
              events: [
                { type: "textMessage", text: "Ol??, sou o pai do seu amigo!", faceHero:"npcA" },
                { type: "textMessage", text: "Posso deixar voc?? ir com ele, mas protega ele por mim!"},
                { type: "addStoryFlag", flag: "CONVERSAR_COM_PAIS" },
              ]
            }
          ]
        },
      },
      cutsceneSpaces:{
        [utils.asGridCoord(8,12)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "fallarden",
                x: utils.withGrid(7),
                y: utils.withGrid(13),
                direction: "down"
              }
            ]
          }
        ],
      }
    },
    quarto4:{
      id: "quarto4",
      lowerSrc: "./img/lugares/quarto3.png",
      upperSrc: "./img/lugares/quartoa3.png",
      ConfigObjects: {
        hero: {
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(8),
          y: utils.withGrid(8),
        },
        npcA: {
            type: "Person",
            x: utils.withGrid(10),
            y: utils.withGrid(9),
            src: "/img/npc/SpriteSheet8.png",
            talking: [
              {
                events: [
                  { type: "textMessage", text: "Dicas: status de cura vai te curar gradualmente por uns turnos!", faceHero:"npcA" },
                  { type: "textMessage", text: "Dicas: status de paralisia paralisa as vezes seu oponente!" }
                ]
              },
            ]
        },
        npcB: {
            type: "Person",
            x: utils.withGrid(4),
            y: utils.withGrid(6),
            src: "/img/npc/SpriteSheet11.png",
            talking: [
            {
                events: [
                { type: "textMessage", text: "Estou com medo dos monstros!", faceHero:"npcB" },
                ]
            }
            ],
        behaviorLoop: [
          { type: "walk", direction: "right", },
          { type: "walk", direction: "right", },
          { type: "walk", direction: "down", },
          { type: "walk", direction: "down", },
          { type: "walk", direction: "left", },
          { type: "walk", direction: "left", },
          { type: "walk", direction: "up", },
          { type: "walk", direction: "up", },
          { type: "stand", direction: "up", time: 500 },
          { type: "stand", direction: "left", time: 500 },
        ]
        },
      },
      cutsceneSpaces:{
        [utils.asGridCoord(8,12)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "fallarden",
                x: utils.withGrid(3),
                y: utils.withGrid(13),
                direction: "down"
              }
            ]
          }
        ],
      }
    },
    loja: {
      id: "loja",
      lowerSrc: "./img/lugares/loja.png",
      upperSrc: "./img/lugares/lojaa1.png",
      ConfigObjects: {
        hero: {
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(8),
          y: utils.withGrid(8),
        },
        npcA: {
          type: "Person",
          x: utils.withGrid(8),
          y: utils.withGrid(7),
          src: "/img/npc/SpriteSheet16.png",
          talking: [
            {
              events: [
                { type: "textMessage", text: "A loja por enquanto n??o est?? dispon??vel!", faceHero:"npcA" },
              ]
            },
          ],
        },
      },
        cutsceneSpaces: {
          [utils.asGridCoord(8,9)]: [
            {
              events: [
                { type: "textMessage", text: "A loja por enquanto n??o est?? dispon??vel!" },
              ]
            }
          ],
          [utils.asGridCoord(8,12)]: [
            {
              events: [
                {
                  type: "changeMap",
                  map: "fallarden",
                  x: utils.withGrid(16),
                  y: utils.withGrid(6),
                  direction: "down"
                }
              ]
            }
          ],
        }
    },
    marshall1:{
      id: "marshall1",
      lowerSrc: "./img/lugares/marshall cave1.png",
      upperSrc: "./img/lugares/marshall cave1a1.png",
      ConfigObjects: {
        hero: {
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(8),
          y: utils.withGrid(8),
        },
        npcA:{
          type: "Person",
          x: utils.withGrid(9),
          y: utils.withGrid(4),
          src: "/img/npc/monster1.png",
          talking: [
            {
              required: ["DERROTE_NPC1"],
              events: [
                { type: "textMessage", text: "Monstro j?? derrotado!", faceHero: "npcA" },
                { who: "npcA", type: "walk",  direction: "right" },
                { who: "npcA", type: "stand",  direction: "down" },
              ]
            },
            {
              events: [
                { type: "textMessage", text: "AAHAHAH", faceHero: "npcA" },
                { type: "battle", enemyId: "m1" },
                { type: "addStoryFlag", flag: "DERROTE_NPC1"},
                { type: "textMessage", text: "HUFFMMFIF", faceHero: "npcA" },
                { who: "npcA", type: "walk",  direction: "right" },
                { who: "npcA", type: "stand",  direction: "down" },
              ]
            }
          ]
        },
      },
      cutsceneSpaces: {
      [utils.asGridCoord(9,14)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "fallarden",
              x: utils.withGrid(12),
              y: utils.withGrid(13),
              direction: "down"
            }
          ]
        },
      ],
      [utils.asGridCoord(9,1)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "marshall2",
              x: utils.withGrid(9),
              y: utils.withGrid(13),
              direction: "up"
            }
          ]
        }
      ],
     }
    },
    marshall2:{
      id: "marshall2",
      lowerSrc: "./img/lugares/marshall cave2.png",
      upperSrc: "./img/lugares/marshall cave1a1.png",
      ConfigObjects: {
        hero: {
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(8),
          y: utils.withGrid(8),
        },
        npcA:{
          type: "Person",
          x: utils.withGrid(9),
          y: utils.withGrid(4),
          src: "/img/npc/monster2.png",
          talking: [
            {
              required: ["DERROTE_NPC2"],
              events: [
                { type: "textMessage", text: "Monstro j?? derrotado!", faceHero: "npcA" },
                { who: "npcA", type: "walk",  direction: "right" },
                { who: "npcA", type: "stand",  direction: "down" },
              ]
            },
            {
              events: [
                { type: "textMessage", text: "AAHAHAH", faceHero: "npcA" },
                { type: "battle", enemyId: "m3" },
                { type: "addStoryFlag", flag: "DERROTE_NPC2"},
                { type: "textMessage", text: "HUFFMMFIF", faceHero: "npcA" },
                { who: "npcA", type: "walk",  direction: "right" },
                { who: "npcA", type: "stand",  direction: "down" },
              ]
            }
          ]
        },
      },
      cutsceneSpaces: {
      [utils.asGridCoord(9,14)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "marshall1",
              x: utils.withGrid(9),
              y: utils.withGrid(2),
              direction: "down"
            }
          ]
        }
      ],
     }
    },
  }