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
      this.lineup = ["p1", "p2", "p3"];
      this.items = [
        { actionId: "item_recoverHp", instanceId: "item1" },
        { actionId: "item_recoverHp", instanceId: "item2" },
        { actionId: "item_recoverStatus", instanceId: "item3" },
      ]
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