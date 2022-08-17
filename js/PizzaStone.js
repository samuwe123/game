class PizzaStone extends GameObject {
    constructor(config) {
      super(config);
      this.sprite = new Sprite({
        gameObject: this,
        src: "/img/icons/pizza-stone.png",
        animations: {
          "used-down"   : [ [1,1] ],
          "unused-down" : [ [3,1] ],
        },
        currentAnimation: "used-down"
      });
      this.storyFlag = config.storyFlag;
      this.pizzas = config.pizzas;
  
      this.talking = [
        {
          required: [this.storyFlag],
          events: [
            { type: "textMessage", text: "Você já usou isso." },
          ]
        },
        {
          events: [
            { type: "textMessage", text: "Aproximando..." },
            { type: "craftingMenu", pizzas: this.pizzas },
            { type: "addStoryFlag", flag: this.storyFlag },
          ]
        }
      ]
  
    }
  
    update() {
     this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag]
      ? "used-down"
      : "unused-down";
    }
  
  }