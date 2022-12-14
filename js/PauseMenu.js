class PauseMenu {
  constructor({progress, onComplete}) {
    this.progress = progress;
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
            this.progress.save();
            this.close();
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

    

    return [
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
    this.element.classList.add("PauseMenu");
    this.element.classList.add("overlayMenu");
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