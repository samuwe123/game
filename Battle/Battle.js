class Battle{
    constructor(){
        this.combatants = {
            "player1": new Combatant({
                ...Monsters.Ninja,
                team: "player",
                hp: 100,
                maxHp: 100,
                xp: 70,
                maxXp: 100,
                level: 1,
                status: { type: "saucy" },
                isPlayerControlled: true
            }, this),
            "enemy1": new Combatant({
                ...Monsters.Axolot,
                team: "enemy",
                hp: 70,
                maxHp: 100,
                xp: 30,
                maxXp: 100,
                level: 1,
            }, this),
        }
        this.activeCombatants = {
            player: "player1",
            enemy: "enemy1",
        }
        this.items = [
            { actionId: "item_recoverStatus", instanceId: "p1", team: "player" },
            { actionId: "item_recoverStatus", instanceId: "p2", team: "player" },
            { actionId: "item_recoverStatus", instanceId: "p3", team: "enemy" },
            { actionId: "item_recoverHp", instanceId: "p4", team: "player" },
        ]
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

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element)
        })

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