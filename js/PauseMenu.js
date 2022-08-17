class PauseMenu {
  constructor({onComplete}) {
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {

    //Case 1: Show the first page of options
    if (pageKey === "root") {
      const lineupPizzas = playerState.lineup.map(id => {
        const {pizzaId} = playerState.pizzas[id];
        const base = Monsters[pizzaId];
        return {
          label: base.name,
          description: base.description,
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions(id) )
          }
        }
      })
      return [
        ...lineupPizzas,
        {
          label: "Save",
          description: "Salve seu progresso",
          handler: () => {
            
          }
        },
        {
          label: "Close",
          description: "Feche o menu de pausa",
          handler: () => {
            this.close();
          }
        }
      ]
    }

    const unequipped = Object.keys(playerState.pizzas).filter(id => {
        console.log("unequipped")
        return playerState.lineup.indexOf(id) === -1;
      }).map(id => {
        const {pizzaId} = playerState.pizzas[id];
        const base = Monsters[pizzaId];
        return {
          label: `Swap for ${base.name}`,
          description: base.description,
          handler: () => {
            playerState.swapLineup(pageKey, id);
            this.keyboardMenu.setOptions( this.getOptions("root") );
          }
        }
      })

    return [
      ...unequipped,
      {
        label: "Mover para frente",
        description: "mova seus personagens para frente",
        handler: () => {
          playerState.moveToFront(pageKey);
          this.keyboardMenu.setOptions( this.getOptions("root") );
        }
      },
      {
        label: "Volte",
        description: "Volte ao menu anterior",
        handler: () => {
          this.keyboardMenu.setOptions( this.getOptions("root") );
        }
      }
    ];
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("PauseMenu")
    this.element.innerHTML = (`
      <h2>Pause Menu</h2>
    `)
  }

  close() {
    this.enter?.unbind();
    this.keyboardMenu.end();
    this.element.remove();
    this.onComplete();
  }

  async init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container
    })
    this.keyboardMenu.init(this.element);
    this.keyboardMenu.setOptions(this.getOptions("root"));

    container.appendChild(this.element);

    utils.wait(200);
    this.enter = new KeyPressListener("Escape", () => {
      this.close();
    })
  }

}