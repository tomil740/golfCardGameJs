//import the prompt for using user input
const ps = require("prompt-sync");
const prompt = ps();

const {
    BaseData
}= require('./gameObjects/BaseData.js');
const {
    Player
}= require('./gameObjects/Player.js');
const {
    HandCard
}= require('./gameObjects/HandCard.js');

const {
    Game
}= require('./gameObjects/Game.js');


//initalize the data

playGame();

/*
play game: 
will include all of the related greadeans to do a game session
*/ 
let playAgain = "y"

function playGame(){
    
    //game object will supply all the action needed according to the user inputs
    const game  = initalizeNewGame()

    game.printBoard();

        do{
            //display which player turn it is
            console.log(game.turnDeclaration());
            
            //take the first main user input 
            let userFirstPick = twoOptionsPick('choose action: 1)Draw from deck 2) Take from discard pile:');
        
            //the actions according to the first pick
            if(userFirstPick == 1){
                const drawCard = game.drawFromDeck();
                let userSecondPick = twoOptionsPick('1)replace with a face down card 2)discard the drawn card:');

                if(userSecondPick == 1){
                    game.replaceCard(drawCard);
                }else{
                    game.pushToDiscardPile(drawCard);
                } 

            }else if(userFirstPick == 2){
                game.takeFromDiscardPile();
            }    
            //display the updated board
            game.printBoard();
            game.updateTurn();
    
        //check if the game ends:
        }while(!game.isAllOpen())

}

while(playAgain != "n"){
    playAgain = prompt('play again? (y/n):');
    if(playAgain === "y"){
        playGame();
    }else if(playAgain != "n"){
        console.log("invalid input try again...");
        playAgain = prompt('play again? (y/n):');
    }
}


/*initalize a new game setup:
      * create new deck
      * deal cards randomly from the current deck to each player and create matched player objects...
      * create game object with all the needed aarguments
 */
function initalizeNewGame(){

    const baseData = new BaseData();

    const name1 = prompt('Enter player 1 name: ');
    const theHand1 = baseData.initalizeHand().map((cardItem)=>
        new HandCard(cardItem)
    )
    const player1 = new Player(name1,theHand1,prompt);

    const name2 = prompt('Enter player 2 name: ');
    const theHand2 = baseData.initalizeHand().map((cardItem)=>
        new HandCard(cardItem)
    )
    const player2 = new Player(name2,theHand2,prompt);

    const game = new Game(player1,player2,baseData,prompt);

    return game;
}

/*
  will get the to input sentance to represent 
  and will return the matched input until its valid 
*/ 
function twoOptionsPick(outputSentence){
    //take the first main user input 
    let userInput = prompt(outputSentence);
    
    //validation section for the input...
    while(userInput != 1 && userInput != 2){
        console.log("invalid input,try again");
        userInput = prompt(outputSentence);
    }   

    return userInput;
}





    