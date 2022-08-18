window.MonsterTypes = {
    assasino: "assasino",
    guerreiro: "guerreiro",
    mago: "mago",
    tank: "tank",
}

window.Monsters = {
    "Ninja": {
        name: "Ninja",
        description: "Um ninja supremo",
        description: "Hero",
        type: MonsterTypes.assasino,
        src: "/img/npc/SpriteSheetgoo1.png",
        icon: "/img/icons/assasino.png",
        actions: [ "saucyStatus", "clumsyStatus", "damage1", "damage2" ],
    },
    "Friend": {
        name: "Amigo",
        description: "Um parceiro consistente",
        type: MonsterTypes.guerreiro,
        src: "/img/npc/SpriteSheetgoo8.png",
        icon: "/img/icons/guerreiro.png",
        actions: [ "saucyStatus", "clumsyStatus", "damage1", ],
    },
    "Fred": {
        name: "Fred",
        description: "Um maluco da pesada",
        type: MonsterTypes.tank,
        src: "/img/npc/SpriteSheetgoo4.png",
        icon: "/img/icons/escudo.png",
        actions: [ "saucyStatus", "clumsyStatus", "damage3", "damage1", ],
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
        actions: [ "damage4" ],
    },
    "Bamboo": {
        name: "Bamboo",
        type: MonsterTypes.assasino,
        src: "/img/npc/monstergo2.png",
        icon: "/img/icons/assasino.png",
        actions: [ "damage5" ],
    }
}