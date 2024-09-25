
export class Game{
    #prompt;
    #player1;
    #player2;
    #baseData;
    #player1Turn;
    constructor(player1,player2,baseData,prompt){
        this.#prompt = prompt;
        this.#player1 = player1;
        this.#player2 = player2;
        this.#baseData = baseData;
        this.#player1Turn = true;
    }
    get prompt (){
        return this.#prompt;
    }

    /*
    printBoard:
    input: optional endResult boolean value will set to the function the end results option on sending it as true
    the function will take the players objects from the local scope (not as arguments) and print them as demanded ...
    */
    printBoard(endResults){
        console.log("- - -  Board - - -");
        console.log(`${this.#player1.playerName}:  ${this.#player1.joinExposeHand(endResults)}`);
        console.log(`${this.#player2.playerName}:  ${this.#player2.joinExposeHand(endResults)}`);
        console.log(`Discard pile Top card: ${baseData.discardPile[baseData.discardPile.length-1]}`);
    }

    takeAction(player){
        //display which player turn it is
        console.log(`${player.playerName} Turn`);
    
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
            let userSecondPick = prompt('1)replace with a face down card 2)discard the drawn card:');
            while(userFirstPick != 1 && userFirstPick != 2){
                console.log("invalid input,try again");
                userSecondPick = prompt('1)replace with a face down card 2)discard the drawn card:');
            } 
            if(userSecondPick == 1){
                player.replaceCard(drawCard);
            }else{
                discardPile.push(drawCard);
            }  
    
        }
        else if(userFirstPick == 2){
            const theCard = discardPile.pop();
            if(discardPile.length < 1){
                discardPile.push(takeRandomCardFromDeck());
            }
            replaceCard(player,theCard);
        }
    }

    isAllOpen(){
        let isAllOpen = true;
    
        for(let card of this.#player1.hand){
            if(card.toExpose === "Face Down"){
                isAllOpen = false;
                break;
            }
        }

        for(let card of this.#player2.hand){
            if(card.toExpose === "Face Down"){
                isAllOpen = false;
                break;
            }
        }

        return isAllOpen;
    }

    start(){
        do{
            //set the turn to the matched player ...
            const thePlayer = this.#player1Turn ? this.#player1 : this.#player2;
            //call the action menu option with the matched player
            this.takeAction(thePlayer);
            //switch back the turn 
            player1Turn = !player1Turn;
            //display the updated board
            printBoard();
    
            //check if the game ends:
        }while(!isAllOpen())
    }
}