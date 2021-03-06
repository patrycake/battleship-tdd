let player = ((playerName) => {
    const name = playerName;
    let compBoard = new Array(10).fill('o').map(() => new Array(10).fill('o'));

    function play(enemyBoard, row, col) {
        return enemyBoard.receiveAttack(row, col)
    }

    function randomPlay(enemyBoard) {
        let row, col;
        do {
            row = Math.floor(Math.random() * (9));
            col = Math.floor(Math.random() * (9));
        }
        while (compBoard[row][col] != 'o')
        compBoard[row][col] = 'x'
        let val = enemyBoard.receiveAttack(row, col)
        return {
            val,
            row, 
            col
        }
    }

    return {
        name,
        play, 
        randomPlay
    }

})

module.exports = player;