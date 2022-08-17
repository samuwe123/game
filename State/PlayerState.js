class PlayerState {
    constructor() {
      this.pizzas = {
        "p1": {
          pizzaId: "Ninja",
          hp: 90,
          maxHp: 100,
          xp: 90,
          maxXp: 100,
          level: 1,
          status: null,
        },
        "p2": {
          pizzaId: "Friend",
          hp: 50,
          maxHp: 100,
          xp: 75,
          maxXp: 100,
          level: 1,
          status: null,
        },
        "p3": {
            pizzaId: "Fred",
            hp: 150,
            maxHp: 150,
            xp: 75,
            maxXp: 100,
            level: 1,
            status: null,
          }
      }
      this.lineup = ["p1"];
      this.items = [
        { actionId: "item_recoverHp", instanceId: "item1" },
        { actionId: "item_recoverHp", instanceId: "item2" },
        { actionId: "item_recoverStatus", instanceId: "item3" },
      ]
      this.storyFlags = {
      };
    }

    addPizza(pizzaId) {
      const newId = `p${Date.now()}`+Math.floor(Math.random() * 99999);
      this.pizzas[newId] = {
          pizzaId: "Friend",
          hp: 50,
          maxHp: 100,
          xp: 75,
          maxXp: 100,
          level: 1,
          status: null
      }
      if (this.lineup.length < 3) {
        this.lineup.push(newId)
      }
      utils.emitEvent("LineupChanged");
      console.log(this)
    }
  

    swapLineup(oldId, incomingId) {
      const oldIndex = this.lineup.indexOf(oldId);
      this.lineup[oldIndex] = incomingId;
      utils.emitEvent("LineupChanged");
    }
  
    moveToFront(futureFrontId) {
      this.lineup = this.lineup.filter(id => id !== futureFrontId);
      this.lineup.unshift(futureFrontId);
      utils.emitEvent("LineupChanged");
    }
  }
  window.playerState = new PlayerState();