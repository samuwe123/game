class GameObject {
    constructor(config) {
      this.id = null;
      this.isMounted = false;
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.direction = config.direction || "down";
      this.sprite = new Sprite({
        gameObject: this,
        src: config.src || "/img/npc/SpriteSheet1.png",
      });
  
      this.behaviorLoop = config.behaviorLoop || [];
      this.behaviorLoopIndex = 0;
      this.talking = config.talking || [];
      this.retryTimeout = null;
    }
  
    mount(map) {
      this.isMounted = true;
  
      //If we have a behavior, kick off after a short delay
      setTimeout(() => {
        this.doBehaviorEvent(map);
      }, 10)
    }
  
    update() {
    }
  
    async doBehaviorEvent(map) { 
  
      if (this.behaviorLoop.length === 0 ) {
        return;
      }

      if (map.isCutscenePlaying) {
        console.log("will retry", this.id)
        if (this.retryTimeout) {
          clearTimeout(this.retryTimeout);
        }
        this.retryTimeout = setTimeout(() => {
          this.doBehaviorEvent(map);
        }, 1000)
        return;
      }
  
      let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
      eventConfig.who = this.id;
  
      const eventHandler = new OverworldEvent({ map, event: eventConfig });
      await eventHandler.init(); 
  
      this.behaviorLoopIndex += 1;
      if (this.behaviorLoopIndex === this.behaviorLoop.length) {
        this.behaviorLoopIndex = 0;
      } 
  
      this.doBehaviorEvent(map);
      
  
    }
  
  
  }