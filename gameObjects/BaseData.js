export class BaseData{
    #theDeck;
    #discardPile;
    constructor(){
        this.#theDeck = this.genarateDeck();
        this.#discardPile = [(this.takeRandomCardFromDeck())];
    }

    get theDeck(){
        return this.#theDeck;
    }
 
    get discardPile(){
        return this.#discardPile;
    }

    /*
    genarateDeck:
    will create an array with the matched card names of regular pack of cards...
    and return it
    */
    genarateDeck(){
        const result = [];
        const symbols = ["Clubs","Diamonds","Hearts","Spades"];
        for(let sym of symbols){
            for(let counter = 1 ; counter < 14; counter++){
                if(counter == 13){
                    result.push(`King of ${sym}`);
                }else if(counter == 12){
                    result.push(`Queen of ${sym}`);
                }else if(counter == 11){
                    result.push(`Jack of ${sym}`);
                }else if(counter == 1){
                    result.push(`Ace of ${sym}`);
                }else{
                    result.push(`${counter} of ${sym}`);
                }
            }
        }
        return result;
    }
    /*
    drawFromDeck
    will take out of the deck the top card
    if the deck is empty the cards must be in the discardPile then we will swap all of those back in the deck beside the top open card
    and make the draw action...
    */
    drawFromDeck(){
        let result = this.theDeck.pop()
        if(result == undefined){
            const backToDeck = this.#discardPile.slice(0,this.#discardPile.length-2);
            this.#discardPile = this.#discardPile.slice(this.#discardPile.length-1);
            //shafle the deck
            this.theDeck.push(backToDeck);
            result = this.theDeck.pop();
        }
        return result;
    }

        /*
    initalizeHand:
    will be used at the beging of the game to crate player hand in the game
    *edge cases*
    the deck couldnt be empty (start of the game...),must be 4 cards in it
    */
    initalizeHand(){
        const result = [];
        for(let i = 0; i < 4; i++){
            const theCard = takeRandomCardFromDeck()
            result.push(theCard);
        }
        return result;
    }

    /*
    takeRandomCardFromDeck:
    instade of shuffling the deck we will take random card from it on every pull with this matched function
    to make sure the cards are random...
    */
    takeRandomCardFromDeck(){
        let randomIndex = Math.floor(Math.random() * this.#theDeck.length);
        const theCard = this.#theDeck[randomIndex];
        const partA = this.#theDeck.slice(0,randomIndex-1);
        this.#theDeck = partA.concat(this.#theDeck.slice(randomIndex+1));
        return theCard;
    }

        /*
    initalizeHand:
    will be used at the beging of the game to crate player hand in the game
    *edge cases*
    the deck couldnt be empty (start of the game...),must be 4 cards in it
    */
    initalizeHand(){
        const result = [];
        for(let i = 0; i < 4; i++){
            const theCard = this.takeRandomCardFromDeck()
            result.push(theCard);
        }
        return result;
    }

    takeFromDiscardPile(){
        if(this.#discardPile.length < 1){
            this.#discardPile.push(this.takeRandomCardFromDeck());
        }
        return this.#discardPile.pop();
    }

}
