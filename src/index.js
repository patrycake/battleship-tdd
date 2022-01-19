const board = require("./board")
const player = require("./player")
const dom = require("./dom")
import "./style.css"

(()=>{

     
    let compBoard = board();
    let userBoard = board();

    let compPlayer = player();
    let userPlayer = player();

    compBoard.placeAllShips();
    userBoard.placeAllShips();

    dom.displayBoard("player-board", handleClickPlayer)
    dom.displayBoard("attack-board", handleClickAttack)
    dom.displayShips("player-board", userBoard.ships)

    function handleClickPlayer(e){
        //place ships

    }

    function handleClickAttack(e){
        //get user x,y for attack
        if(userPlayer.play(compBoard, e.target.dataset.row, e.target.dataset.col)){
            e.target.classList.add("hit")
        }
        else{ 
            e.target.classList.add("miss")}
        compTurn(userBoard)
    }

   
    
    

    
    function compTurn(board) {
        let compPlay = compPlayer.randomPlay(board)
        let userBoard = document.getElementById("player-board")
        if(compPlay.val) {
            userBoard.childNodes[compPlay.row].childNodes[compPlay.col].classList.add("hit")
        }
        else{userBoard.childNodes[compPlay.row].childNodes[compPlay.col].classList.add("miss")}
    }

    


})()