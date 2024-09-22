golf game readMe:

Basic game/“project” description :
A two-player game includes one deck of cards each player gets 4 cards and through the game, he needs to collect the highest score hand of cards to win, the game ends when a player exposes all of his cards through his actions…

the implementation method:
basic setup:
declaring local variables to store the generally used Ingredients for the game, which will be initialized at the game function when a game is starting

the game function:
Each game will start by clearing all of the used general (outside scoped variables) and then back for a new game, a new pack of cards dealing the card to each player, and set up the player object with name and all of the objects as default (unexposed).

*player/handCard objects*:
the player and handCard object let us control the game state by simply updating the exposed hand on the action then we can find the score at any time and make sure the function keeps track of when the game is finished

the actual game: The game will work through a while loop with the stop condition set up according to the matched function “isAllopen” that will check the end condition on every iteration…
in the game loop:
* which player turn will be controlled with helper variable through the loop iterations
* on each turn, we will send the matched player to the “take-action” function that will supply all the possible actions and dialog to apply them 
* at the end of each player action, we will display the current board according to the updates of the action

game over condition:
When coming out of the loop we will apply the “get hand score” function that will calculate the scores and accordingly, we will return the game-winner
