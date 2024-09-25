export class Player{
    #name;
    #hand;
    constructor(name,hand){
        this.#name = name;
        this.#hand = hand;
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

    replaceCard(player,theCard){
        let theUserPick = prompt('choose which card to replace (1->4):');
    
        while(theUserPick != 1 && theUserPick != 2 && theUserPick != 3 && theUserPick != 4){
            console.log("eValid input please enter again");
            theUserPick = prompt('choose which card to replace:');
        }
    
        const cardToReplace = player.hand[(theUserPick-1)].value;
        discardPile.push(cardToReplace);
        this.#hand[(theUserPick-1)] = {
            toExpose : theCard,
            value : theCard
        };
        console.log(`Replacing ${cardToReplace} with ${theCard}`);
    }
}