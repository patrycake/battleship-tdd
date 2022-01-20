const board = require("./board")
const player = require("./player")
const dom = require("./dom")
import "./style.css"

(() => {


    let compBoard = board();
    let userBoard = board();

    let compPlayer = player();
    let userPlayer = player();

    let userWin = false;
    let compWin = false;

    compBoard.placeAllShips();
    userBoard.placeAllShips();

    dom.displayBoard("player-board", handleClickPlayer)
    dom.displayBoard("attack-board", handleClickAttack)
    dom.displayShips("player-board", userBoard.ships)

    function handleClickPlayer(e) {
        //place ships

    }

    function handleClickAttack(e) {
        //get user x,y for attack

        if (compWin) {
            console.log("Computer Won!")
        } else if (userWin) {
            console.log("Player Won")
        } else {

            if (userPlayer.play(compBoard, e.target.dataset.row, e.target.dataset.col)) {
                userWin = compBoard.checkForSunkenShips()
                
                e.target.classList.add("hit")
            } else {
                e.target.classList.add("miss")
            }
            compWin = compTurn(userBoard)
        }
    }






    function compTurn(board) {
        let compPlay = compPlayer.randomPlay(board)
        let userBoard = document.getElementById("player-board")
        if (compPlay.val) {
            userBoard.childNodes[compPlay.row].childNodes[compPlay.col].classList.add("hit")

        } else {
            userBoard.childNodes[compPlay.row].childNodes[compPlay.col].classList.add("miss")
        }
        return board.checkForSunkenShips()
    }




})()