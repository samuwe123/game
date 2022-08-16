class Battle{
    constructor({ enemy, onComplete }){

        this.enemy = enemy;
        this.onComplete = onComplete;

        this.combatants = {
         /*"player1": new Combatant({
                ...Monsters.Ninja,
                team: "player",
                hp: 100,
                maxHp: 100,
                xp: 70,
                maxXp: 100,
                level: 1,
                status: null,
                isPlayerControlled: true
            }, this),
            "player2": new Combatant({
                ...Monsters.Friend,
                team: "player",
                hp: 100,
                maxHp: 100,
                xp: 70,
                maxXp: 100,
                level: 1,
                status: null,
                isPlayerControlled: true
            }, this),
            "player3": new Combatant({
                ...Monsters.Fred,
                team: "player",
                hp: 150,
                maxHp: 150,
                xp: 70,
                maxXp: 100,
                level: 1,
                status: null,
                isPlayerControlled: true
            }, this),
            "enemy1": new Combatant({
                ...Monsters.Axolot,
                team: "enemy",
                hp: 10,
                maxHp: 100,
                xp: 30,
                maxXp: 100,
                level: 1,
            }, this),
            "enemy2": new Combatant({
                ...Monsters.Fire,
                team: "enemy",
                hp: 10,
                maxHp: 80,
                xp: 50,
                maxXp: 100,
                level: 1,
            }, this), */
        }

        this.activeCombatants = {
            player: null,
            enemy: null,
        }

        window.playerState.lineup.forEach(id => {
            this.addCombatant(id, "player", window.playerState.pizzas[id])
        });

        Object.keys(this.enemy.pizzas).forEach(key => {
            this.addCombatant("e_"+key, "enemy", this.enemy.pizzas[key])
        })
        
        this.items = [
            //{ actionId: "item_recoverStatus", instanceId: "p1", team: "player" },
            //{ actionId: "item_recoverStatus", instanceId: "p2", team: "player" },
            //{ actionId: "item_recoverStatus", instanceId: "p3", team: "enemy" },
            //{ actionId: "item_recoverHp", instanceId: "p4", team: "player" },
        ]
    }

    addCombatant(id, team, config) {
        this.combatants[id] = new Combatant({
          ...Monsters[config.pizzaId],
          ...config,
          team,
          isPlayerControlled: team === "player"
        }, this)
  
        console.log(this)
        this.activeCombatants[team] = this.activeCombatants[team] || id
    }

    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = (`
        <div class="Battle_hero">
            <img src="${'/img/npc/SpriteSheet1.png'}" alt="Hero"/>
        </div>
        <div class="Battle_enemy">
            <img src="${'/img/npc/monster1.png'}" alt="Enemy"/>
        </div>
        `)
    }

    init(container){
        this.createElement();
        container.appendChild(this.element);

        this.playerTeam = new Team("player", "Hero");
        this.enemyTeam = new Team("enemy", "Bully");

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element)

            if (combatant.team === "player") {
                this.playerTeam.combatants.push(combatant);
            } else if (combatant.team === "enemy") {
                this.enemyTeam.combatants.push(combatant);
            }
        })

        this.playerTeam.init(this.element);
        this.enemyTeam.init(this.element);

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve);
                })
            }
        }) 

        this.turnCycle.init();

    }

}