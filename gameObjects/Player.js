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
        /*
    getHandScore:
    input: get a hand array of HandCard type objects
    the function will go over the values of each HandCard object and convert it according to the rule to its matched value in the score
    *we will check for edge case in the calculation (pairs and etc) and act accordingly as a rsult we will*
    return the matched hand score as a number!
    */
    getHandScore(){
        let valuesArray = [];
        for(let card of this.hand){
            let baseVal = card.value[0];
            switch(card.value[0]){
                case "A":
                    baseVal = 1; 
                    break;
                case "J":
                    baseVal = -1; 
                    break;   
                case "Q":
                    baseVal = 1; 
                    break; 
                case "K":
                    baseVal = 1; 
                    break;  
                case "7":
                    baseVal = 0; 
                    break;  
                default:
                    baseVal = Number(card.value[0]);     
                    break;                     
            }
            valuesArray.push(baseVal);
        }
        let theScore = 0; 
        //check for pairs to subtract them from the sum...
        for(let cardValue of valuesArray){
            let counter = 0; 
            for(let cardValue2 of valuesArray){
                if(cardValue === cardValue2){
                    counter++;
                }
            }
            if(counter > 1){
                switch(cardValue){
                    case 7:
                        break;
                    case -1:
                        break;
                    default:
                        theScore-=(cardValue*counter);
                        break;      
                }
            }
        }
        //sum the result
        for(let item of valuesArray){
            theScore+=item;
        }
        return theScore;

    }
}