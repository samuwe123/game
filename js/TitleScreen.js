class TitleScreen {
    constructor({ progress }) {
      this.progress = progress;
    }
  
    getOptions(resolve) {
      const safeFile = this.progress.getSaveFile();
      return [
        { 
          label: "Novo jogo",
          description: "Começe uma nova jornada!",
          handler: () => {
            this.close();
            resolve();
          }
        },
        safeFile ? {
          label: "Continue o jogo",
          description: "Resumo da sua jornada",
          handler: () => {
            this.close();
            resolve(safeFile);
          }
        } : null
      ].filter(v => v);
    }
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("TitleScreen");
      this.element.innerHTML = (`
        <img class="TitleScreen_logo" src="/img/icons/logo.png" alt="Battle Masters" />
      `)
  
    }
  
    close() {
      this.keyboardMenu.end();
      this.element.remove();
    }
    
    init(container) {
      return new Promise(resolve => {
        this.createElement();
        container.appendChild(this.element);
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(this.element);
        this.keyboardMenu.setOptions(this.getOptions(resolve))
      })
    }
  
  }