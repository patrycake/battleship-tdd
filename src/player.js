const board = require("./board")
const ship = require("./ship")
/*
shipPlacement
{name, 
position}
*/
let player = ((playerName) => {
    const name = playerName;
    let compBoard = new Array(10).fill('o').map(() => new Array(10).fill('o'));

    function play(enemyBoard, x, y) {
        enemyBoard.receiveAttack(x, y)
    }

    function randomPlay(enemyBoard) {
        do {
            let x = Math.random() * (9) + 1;
            let y = Math.random() * (9) + 1;
        }
        while (compBoard[x][y] != 'o')
        enemyBoard.receiveAttack(x, y)
        compBoard[x][y] = 'x'

    }

    return {
        name,
        play
    }

})