class Overworld {
    constructor(config) {
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.map = null;
    }
   
     startGameLoop() {
       const step = () => {
         //Clear off the canvas
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   
         //Establish the camera person
         const cameraPerson = this.map.gameObjects.hero;
   
         //Update all objects
         Object.values(this.map.gameObjects).forEach(object => {
           object.update({
             arrow: this.directionInput.direction,
             map: this.map,
           })
         })
   
         //Draw Lower layer
         this.map.drawLowerImage(this.ctx, cameraPerson);
   
         //Draw Game Objects
         Object.values(this.map.gameObjects).sort((a,b) => {
           return a.y - b.y;
         }).forEach(object => {
           object.sprite.draw(this.ctx, cameraPerson);
         })
   
         //Draw Upper layer
         this.map.drawUpperImage(this.ctx, cameraPerson);
         
         if (!this.map.isPaused) {
            requestAnimationFrame(() => {
              step();   
            })
          }
       }
       step();
    }
   
    bindActionInput() {
      new KeyPressListener("Space", () => {
        this.map.checkForActionCutscene()
      })
      new KeyPressListener("Enter", () => {
        if (!this.map.isCutscenePlaying) {
         this.map.startCutscene([
           { type: "pause" }
         ])
        }
      })
    }
   
    bindHeroPositionCheck() {
      document.addEventListener("PersonWalkingComplete", e => {
        if (e.detail.whoId === "hero") {
          //Hero's position has changed
          this.map.checkForFootstepCutscene()
        }
      })
    }
   
    startMap(mapConfig, heroInitialState=null) {
     this.map = new OverworldMap(mapConfig);
     this.map.overworld = this;
     this.map.mountObjects();

     if (heroInitialState) {
      const {hero} = this.map.gameObjects;
      this.map.removeWall(hero.x, hero.y);
      hero.x = heroInitialState.x;
      hero.y = heroInitialState.y;
      hero.direction = heroInitialState.direction;
      this.map.addWall(hero.x, hero.y);
    }
    }
   
    init() {
     this.hud = new Hud();
     this.hud.init(document.querySelector(".game-container"));
     
     this.startMap(window.OverworldMaps.fallarden);
   
     this.bindActionInput();
     this.bindHeroPositionCheck();
   
     this.directionInput = new DirectionInput();
     this.directionInput.init();
   
     this.startGameLoop();
   
    /*
     this.map.startCutscene([
      { type: "battle", enemyId: "m1" }
      //{ type: "changeMap", map: "quarto1"}
     //{ type: "textMessage", text: "Minha primeira mensagem!"}
     ]) */
   
    }
   }