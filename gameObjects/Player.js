export class Player{
    #name;
    #hand;
    #prompt;
    constructor(name,hand,prompt){
        this.#name = name;
        this.#hand = hand;
        this.#prompt = prompt;
    }

    get prompt(){
        return this.#prompt;
    }

    get name(){
        return this.#name;
    }

    get hand(){
        return this.#hand
    }

    joinExposeHand(endResults){
        const playerHand = this.#hand;
        let result = "";
        for(let item of playerHand){
            if(item != playerHand[0]){
                if(endResults){
                    result+=` | ${item.value}`;
                }else{
                    result+=` | ${item.toExpose}`;
                }
            }else{
                if(endResults){
                    result+=`${item.value}`;
                }else{
                    result+=`${item.toExpose}`;
                }
            }
        }
        return result;
    }

    replaceCard(theCard){
        const theUserPick = this.fourOptionsPick('choose which card to replace (1->4):')

        const cardToReplace = this.hand[(theUserPick-1)].value;
        this.hand[(theUserPick-1)] = {
            toExpose : theCard,
            value : theCard
        };
        console.log(`Replacing ${cardToReplace} with ${theCard}`);
        return cardToReplace;
    }

    fourOptionsPick(message){
        let theUserPick = this.prompt(message);
    
        while(theUserPick != 1 && theUserPick != 2 && theUserPick != 3 && theUserPick != 4){
            console.log("eValid input please enter again");
            theUserPick = this.prompt(message);
        }

        return theUserPick;
    }
}