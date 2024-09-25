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

//import {BaseData} from './gameObjects/BaseData.js'
//import { Player } from './gameObjects/Player.js';
//import { HandCard } from './gameObjects/HandCard.js';



//initalize the data


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
        const baseData = new BaseData();

        const name1 = prompt('Enter player 1 name: ');
        const theHand1 = baseData.initalizeHand().map((cardItem)=>
            new HandCard(cardItem)
        )
        const player1 = new Player(name1,theHand1);

        const name2 = prompt('Enter player 2 name: ');
        const theHand2 = baseData.initalizeHand().map((cardItem)=>
            new HandCard(cardItem)
        )
        const player2 = new Player(name2,theHand2);

        const game = new Game(player1,player2,baseData,prompt);

        game.start();

        const playAgain = prompt('play again? (y/n):');
        if(playAgain === "y"){
            playGame();
        }
    }

    