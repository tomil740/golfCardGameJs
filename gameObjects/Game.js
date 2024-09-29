
export class Game{
    #prompt;
    #player1;
    #player2;
    #baseData;
    #thePlayer;
    constructor(player1,player2,baseData,prompt){
        this.#prompt = prompt;
        this.#player1 = player1;
        this.#player2 = player2;
        this.#baseData = baseData;
        this.#thePlayer = true;
    }
    get prompt (){
        return this.#prompt;
    }

    get thePlayer(){
        console.log(this.#thePlayer);
        const thePlayer = (this.#thePlayer) ? this.#player1 : this.#player2;
        return thePlayer;
    }

    turnDeclaration(){
        const thePlayer = this.thePlayer;
        return `${thePlayer.name} Turn`;
    }

    /*
    printBoard:
    input: optional endResult boolean value will set to the function the end results option on sending it as true
    the function will take the players objects from the local scope (not as arguments) and print them as demanded ...
    */
    printBoard(endResults){
        console.log("- - -  Board - - -");
        console.log(`${this.#player1.name}:  ${this.#player1.joinExposeHand(endResults)}`);
        console.log(`${this.#player2.name}:  ${this.#player2.joinExposeHand(endResults)}`);
        console.log(`Discard pile Top card: ${this.#baseData.discardPile[this.#baseData.discardPile.length-1]}`);
    }
    /*
    the function will return a card value ...
    will simply use the baseData function with matched validation methods...
    */
    drawFromDeck(){
        const drawCard = this.#baseData.drawFromDeck();
        console.log(`You took: ${drawCard} `);
        return drawCard;
    }
    
    /*
    will get as argument the card and the number of hand card to replace from the matched hand...
    */
    replaceCard(theCard){
        const discratePileCard = this.thePlayer.replaceCard(theCard);
        this.pushToDiscardPile(discratePileCard);
    }

    pushToDiscardPile(theCard){
        this.#baseData.discardPile.push(theCard);
    }

    /*
    will return the last card from the discard pile...
    */
    takeFromDiscardPile(){
        const discardPileCard = this.#baseData.takeFromDiscardPile();

        this.replaceCard(discardPileCard);
    }

    updateTurn(){
        this.#thePlayer = !this.#thePlayer;
    }
/*takeAction...
    takeAction(player){
        //display which player turn it is
        console.log(`${player.name} Turn`);
    
        //take the first main user input 
        let userFirstPick = this.prompt('choose action: 1)Draw from deck 2) Take from discard pile:');
    
        //validation section for the input...
        while(userFirstPick != 1 && userFirstPick != 2){
    
            console.log("invalid input,try again");
            userFirstPick = this.prompt('choose action: 1)Draw from deck 2) Take from discard pile:');
        }   
        //the actions according to the first pick
        if(userFirstPick == 1){
            const drawCard = this.#baseData.drawFromDeck()
            console.log(`You took: ${drawCard} `);
            let userSecondPick = this.prompt('1)replace with a face down card 2)discard the drawn card:');
            while(userFirstPick != 1 && userFirstPick != 2){
                console.log("invalid input,try again");
                userSecondPick = this.prompt('1)replace with a face down card 2)discard the drawn card:');
            } 
            if(userSecondPick == 1){
                const discratePileCard = player.replaceCard(drawCard);
                this.#baseData.discardPile.push(discratePileCard);
            }else{
                discardPile.push(drawCard);
            }  
    
        }
        else if(userFirstPick == 2){
            if(discardPile.length < 1){
                discardPile.push(takeRandomCardFromDeck());
            }
            const discratePileCard = player.replaceCard(drawCard);
            this.#baseData.discardPile.push(discratePileCard);
        }
    }
        */

    isAllOpen(){
        let isAllOpen = true;
    
        for(let card of this.#player1.hand){
            if(card.toExpose === "Face Down"){
                isAllOpen = false;
                break;
            }
        }

        if(isAllOpen){
            return isAllOpen;
        }

        for(let card of this.#player2.hand){
            if(card.toExpose === "Face Down"){
                isAllOpen = false;
                break;
            }
        }
        return isAllOpen;
    }




}