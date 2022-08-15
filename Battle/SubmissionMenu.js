class SubmissionMenu{
    constructor( {caster, enemy, onComplete, items} ){
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;

        let quantityMap = {};
        items.forEach(item =>{
            if (item.team === caster.team){

                let existing = quantityMap[item.actionId];
                if(existing){
                    existing.quantity += 1;
                } else {
                    quantityMap[item.actionId] = {
                        actionId: item.actionId,
                        quantity: 1,
                        instanceId: item.instanceId,
                    }
                }
            }
        })
        this.items = Object.values(quantityMap);
    }

    getPages(){
        const backOption = {
            label: "Volte",
            description: "Retorne para a página anterior",
            handler: () =>{
                this.keyboardMenu.setOptions(this.getPages().root)
            }
        };
        return{
            root:[
            {
                label: "Ataque",
                description: "Escolha um ataque",
                handler: () => {
                    //attack page
                    this.keyboardMenu.setOptions( this.getPages().attacks )
                }
            },
            {
                label: "Itens",
                description: "Escolha um item",
                handler: () => {
                    //items page
                    this.keyboardMenu.setOptions( this.getPages().items )
                }
            },
            {
                label: "Troca",
                description: "Escolha um personagem",
                handler: () => {
                    //personagem page
                }
            },
            ],
            attacks:[
                ...this.caster.actions.map(key => {
                    const action = Actions[key];
                    return{
                        label: action.name,
                        description: action.description,
                        handler: () => {
                            this.menuSubmit(action)
                        }
                    }
                }),
                backOption
            ],
            items:[
                ...this.items.map(item => {
                    const action = Actions[item.actionId];
                    return{
                        label: action.name,
                        description: action.description,
                        right: () => {
                            return "x"+item.quantity;
                        },
                        handler: () => {
                            this.menuSubmit(action, item.instanceId)
                        }
                    }
                }),
                backOption
            ]
        }
    }

    menuSubmit(action, instanceId=null){

        this.keyboardMenu?.end();

        this.onComplete({
            action,
            target: action.targetType === "friendly" ? this.caster : this.enemy,
            instanceId
        })
    }

    decide(){
        this.menuSubmit(Actions[ this.caster.actions[0] ]);
    }

    ShowMenu(container){
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions( this.getPages().root )
    }

    init(container){

        if(this.caster.isPlayerControlled){
            this.ShowMenu(container)
        } else {
            this.decide()
        }
    }
}