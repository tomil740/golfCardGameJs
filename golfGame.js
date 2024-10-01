//import the prompt for using user input
const ps = require("prompt-sync");
const prompt = ps();


//base setup :



/*
General declartaion,"public scope argument through all the program..."
*/
//initalize matched array of 52 cards pack
let theDeck = genarateDeck();
//initalize an empty discard pile of cards 
let discardPile = [];
//declare in the local scope the player objects(will be initalize at the game function)
let player1 = Player("player1",[]);
let player2 = Player("player2",[]);

//call the game function to start 
playGame();


/*
play game: 
will include all of the related greadeans to do a game session
*/
function playGame(){
/*initalize two players games:
  *  deal cards randomly from the current deck
  *  and setup the object with all of the needed data
*/
    const name1 = prompt('Enter player 1 name: ');
    const theHand1 = initalizeHand()
    player1 = Player(name1,theHand1);

    const name2 = prompt('Enter player 2 name: ');
    const theHand2 = initalizeHand()
    player2 = Player(name2,theHand2);

    //open the first discard from our deck
    discardPile.push(takeRandomCardFromDeck());

    //print the current board
    printBoard();

    //declare helper variable to track who turn starting from player 1
    let player1Turn = true;

    do{
        //set the turn to the matched player ...
        const thePlayer = player1Turn ? player1 : player2;
        //call the action menu option with the matched player
        takeAction(thePlayer);
        //switch back the turn 
        player1Turn = !player1Turn;
        //display the updated board
        printBoard();

        //check if the game ends:
    }while((!isAllOpen(player1.hand)) && (!isAllOpen(player2.hand)))

    //on game fineshed setuation,calculate the result and declare the winner    
    console.log("Game Over!");
    printBoard(true);
    console.log("Final scores:");
    const player1Score = getHandScore(player1.hand);
    const player2Score = getHandScore(player2.hand);

    console.log(`${player1.playerName}: ${player1Score}`);
    console.log(`${player2.playerName}: ${player2Score}`);
    const theWinner = player1Score<player2Score ? player1.playerName : player2.playerName;

    console.log(`${theWinner} wins!`);

    const playAgain = prompt('play again? (y/n):');
    if(playAgain === "y"){
        playGame();
    }
}



/*
getHandScore:
input: get a hand array of HandCard type objects
the function will go over the values of each HandCard object and convert it according to the rule to its matched value in the score
*we will check for edge case in the calculation (pairs and etc) and act accordingly as a rsult we will*
return the matched hand score as a number!
*/
 function getHandScore(hand){
    let valuesArray = [];
    for(let card of hand){
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

/*
printBoard:
input: optional endResult boolean value will set to the function the end results option on sending it as true
the function will take the players objects from the local scope (not as arguments) and print them as demanded ...
*/
function printBoard(endResults){
    console.log("- - -  Board - - -");
    console.log(`${player1.playerName}:  ${joinExposeHand(player1.hand,endResults)}`);
    console.log(`${player2.playerName}:  ${joinExposeHand(player2.hand,endResults)}`);
    console.log(`Discard pile Top card: ${discardPile[discardPile.length-1]}`);
}
function joinExposeHand(playerHand,endResults){
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

function takeAction(player){
    //display which player turn it is
    console.log(`${player.playerName} Turn`);

    //take the first main user input 
    let userFirstPick = prompt('choose action: 1)Draw from deck 2) Take from discard pile:');

    //validation section for the input...
    while(userFirstPick != 1 && userFirstPick != 2){

        console.log("invalid input,try again");
        userFirstPick = prompt('choose action: 1)Draw from deck 2) Take from discard pile:');
    }   
    //the actions according to the first pick
    if(userFirstPick == 1){
        const drawCard = drawFromDeck()
        console.log(`You took: ${drawCard} `);
        let userSecondPick = prompt('1)replace with a face down card 2)discard the drawn card:');
        while(userFirstPick != 1 && userFirstPick != 2){
            console.log("invalid input,try again");
            userSecondPick = prompt('1)replace with a face down card 2)discard the drawn card:');
        } 
        if(userSecondPick == 1){
            replaceCard(player,drawCard);
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

function isAllOpen(hand){
    let isAllOpen = true;

    for(let card of hand){
        if(card.toExpose === "Face Down"){
            isAllOpen = false;
            break;
        }
    }

    return isAllOpen;
}

function replaceCard(player,theCard){
    let theUserPick = prompt('choose which card to replace (1->4):');

    while(theUserPick != 1 && theUserPick != 2 && theUserPick != 3 && theUserPick != 4){
        console.log("eValid input please enter again");
        theUserPick = prompt('choose which card to replace:');
    }

    const cardToReplace = player.hand[(theUserPick-1)].value;
    discardPile.push(cardToReplace);
    player.hand[(theUserPick-1)] = {
        toExpose : theCard,
        value : theCard
    };
    console.log(`Replacing ${cardToReplace} with ${theCard}`);
}

/*
drawFromDeck
will take out of the deck the top card
if the deck is empty the cards must be in the discardPile then we will swap all of those back in the deck beside the top open card
and make the draw action...
*/
function drawFromDeck(){
    let result = theDeck.pop()
    if(result == undefined){
        const backToDeck = discardPile.slice(0,discardPile.length-2);
        discardPile = discardPile.slice(discardPile.length-1);
        //shafle the deck
        theDeck.push(backToDeck);
        result = theDeck.pop();
    }
    return result;
}


/*
initalizeHand:
will be used at the beging of the game to crate player hand in the game
*edge cases*
the deck couldnt be empty (start of the game...),must be 4 cards in it
*/
function initalizeHand(){
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
function takeRandomCardFromDeck(){
    let randomIndex = Math.floor(Math.random() * theDeck.length);
    const theCard = theDeck[randomIndex];
    const partA = theDeck.slice(0,randomIndex-1);
    theDeck = partA.concat(theDeck.slice(randomIndex+1));
    return theCard;
}

/*
genarateDeck:
will create an array with the matched card names of regular pack of cards...
and return it
*/
function genarateDeck(){
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
Helper object genarting function for our dynamic players 
*/

function Player(name,hand){
    const properties = {
        playerName:name,
        hand:[HandCard(hand[0]),HandCard(hand[1]),HandCard(hand[2]),HandCard(hand[3])]
    }
    
    return properties;
}

function HandCard(theCard){
    const properties = {
        toExpose : "Face Down",
        value : theCard
    }

    return properties;
}