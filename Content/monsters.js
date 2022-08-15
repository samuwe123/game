window.MonsterTypes = {
    assasino: "assasino",
    guerreiro: "guerreiro",
    mago: "mago",
    tank: "tank",
}

window.Monsters = {
    "Ninja": {
        name: "Ninja",
        type: MonsterTypes.assasino,
        src: "/img/npc/ninjago1.png",
        icon: "/img/icons/assasino.png",
        actions: [ "saucyStatus", "clumsyStatus", "damage1", "damage2" ],
    },
    "Axolot": {
        name: "Axolot",
        type: MonsterTypes.guerreiro,
        src: "/img/npc/monstergo1.png",
        icon: "/img/icons/guerreiro.png",
        actions: [ "damage1" ],
    },
    "Ciclope": {
        name: "Ciclope",
        type: MonsterTypes.tank,
        src: "/img/npc/monstergo3.png",
        icon: "/img/icons/escudo.png",
        actions: [ "damage1" ],
    },
    "Fire": {
        name: "Fire",
        type: MonsterTypes.mago,
        src: "/img/npc/monstergo5.png",
        icon: "/img/icons/mago.png",
        actions: [ "damage1" ],
    },
    "Bamboo": {
        name: "Bamboo",
        type: MonsterTypes.assasino,
        src: "/img/npc/monster2.png",
        icon: "/img/icons/assasino.png",
        actions: [ "damage1" ],
    }
}