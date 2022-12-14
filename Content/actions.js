window.Actions = {
    damage1: {
        name: "Investida!",
        description: "Ataca o oponente!",
        success: [
            { type: "textMessage", text: "{CASTER} usou {ACTION}!" },
            { type: "animation", animation: "spin" },
            { type: "stateChange", damage: 20 }
        ]
    },
    damage2: {
        name: "Ataque do Ninja!",
        description: "Golpe exclusivo de um ninja!",
        success: [
            { type: "textMessage", text: "{CASTER} usou {ACTION}!" },
            { type: "animation", animation: "spin" },
            { type: "stateChange", damage: 40 }
        ]
    },
    damage3: {
        name: "Martelada!",
        description: "Martelo pesado do Fred!",
        success: [
            { type: "textMessage", text: "{CASTER} usou {ACTION}!" },
            { type: "animation", animation: "spin" },
            { type: "stateChange", damage: 50 },
        ]
    },
    damage4: {
        name: "Chamas!",
        success: [
            { type: "textMessage", text: "{CASTER} usou {ACTION}!" },
            { type: "animation", animation: "glob", color: "red"},
            { type: "stateChange", damage: 40 },
        ]
    },
    damage5: {
        name: "Corte Navalha!",
        success: [
            { type: "textMessage", text: "{CASTER} usou {ACTION}!" },
            { type: "animation", animation: "glob", color: "green"},
            { type: "stateChange", damage: 30 },
        ]
    },
    saucyStatus: {
        name: "Cura",
        description: "Se cura a cada turno!",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} usou {ACTION}!" },
            { type: "stateChange", status: { type: "Cura", expiresIn: 4 } }
        ]
    },
    clumsyStatus: {
        name: "Paralisia",
        description: "Paralisa o oponente!",
        success: [
            { type: "textMessage", text: "{CASTER} usou {ACTION}!" },
            { type: "animation", animation: "glob", color: "#dafd2a"},
            { type: "stateChange", status: { type: "Paralisia", expiresIn: 4 } },
            { type: "textMessage", text: "{TARGET} est?? paralizado ao redor!" },
        ]
    },
    item_recoverStatus:{
        name: "Po????o de status",
        description: "Po????o que vai retirar seu status",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} usou a {ACTION}!" },
            { type: "stateChange", status: null },
            { type: "textMessage", text: "Seu status foi restaurado!", },
        ]
    },
    item_recoverHp:{
        name: "Po????o de Vida",
        description: "Po????o que vai te curar",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} usou a {ACTION}!" },
            { type: "stateChange", recover: 10, },
            { type: "textMessage", text: "Sua vida foi restaurada!", },
        ]
    },
}