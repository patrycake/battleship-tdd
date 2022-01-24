const board = require("./board")
const player = require("./player")
const DOM = require("./dom")
import "./style.css"

(() => {

    let compBoard = board();
    let userBoard = board();

    let compPlayer = player();
    let userPlayer = player();

    let userWin = false;
    let compWin = false;

    compBoard.placeAllShips();
    // userBoard.placeAllShips();

    //first ship place message
    //wait till user clicks placement
    //second ship place message 
    //etc until done with placement
    let dom = DOM(userPlayer, compPlayer, userBoard, compBoard)
    dom.displayBoard("player-board", "placeships") 
    //need a hover function to show possible places and a click function to place ship
    dom.displayBoard("attack-board", "nothing")
    dom.displayShips("player-board", userBoard.ships)

    // let count = 0;
    // let message = document.getElementById("message")
    // let currentShip = ship().shipNames[count]
    // message.innerText = `Place ${currentShip.name}`

    //hover needs to know which ship for squares num highlight
    //change message after the click (not on the hover)


     
    
  

})()