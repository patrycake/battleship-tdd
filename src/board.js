const ship = require("./ship")
const EMPTY_PIECE = 'e';
const SHIP_PIECE = 's'
const MISSED_PIECE = 'm'


let gameBoard = (() => {
    let board = new Array(10).fill(EMPTY_PIECE).map(() => new Array(10).fill(EMPTY_PIECE));
    let ships = []

    function randomRowCol(num) {
        return {
            "small": Math.floor(Math.random() * (9 - num) + 1),
            "big": Math.floor(Math.random() * (9 - num) + 1)
        }
    }

    function placeAllShips() {
        let result = true;
        ship().shipNames.forEach(shipInfo => {
            let HorVer = Math.floor(Math.random() * 1) ///hor 0 ver 1
            let count = 0;
            let position = []
            let rc = randomRowCol(shipInfo.num);
            do {
                position.push([rc.big, rc.small + count])
                count++;
                if (!checkPosition([rc.big, rc.small + count])) {
                    position = [];
                    count = 0
                    rc = randomRowCol(shipInfo.num);
                }
            }
            while (count < shipInfo.num)
            console.log(`placeAllShip: ${shipInfo.name} ${position}`)
            result = result && placeShip(shipInfo.name, position)
        })
        console.log(result)
        return result;
    }


    function placeShip(name, arrPosition) {

        let newShip = ship(name)
        let check = arrPosition.reduce((previous, current) => {
            if (previous && checkPosition(current)) return true
            return false;
        }, true)
        if (check) {
            arrPosition.forEach(item => {
                board[item[0]][item[1]] = SHIP_PIECE;
            })
            ships.push({
                "ship": newShip,
                "position": arrPosition
            })
        }
        return check;
    }

    function checkPosition(arr) {
        if (arr[0] >= 10 || arr[0] < 0) return false
        if (arr[1] >= 10 || arr[1] < 0) return false
        if (board[arr[0]][arr[1]] == SHIP_PIECE) return false
        return true;
    }

    function receiveAttack(row, col) {
        if (board[row][col] != SHIP_PIECE) {
            board[row][col] = MISSED_PIECE;
            return false;
        }
        ships.forEach(shipInfo => {
            shipInfo.position.forEach((coord, index) => {
                if (coord[0] == row && coord[1] == col) shipInfo.ship.hit(index)
            })
        })
        return true;
    }

    function checkForSunkenShips() {
        return !ships.some(shipInfo => {
            if (!shipInfo.ship.isSunk()) return true
        })
    }

    return {
        placeShip,
        receiveAttack,
        checkForSunkenShips,
        placeAllShips,
        ships
    }
})


// let board = gameBoard();
// let position = [[1,1],[1,2],[1,3],[1,4]]
// board.placeShip(position)
// board.receiveAttack(1,2)
// board.checkForSunkenShips()

module.exports = gameBoard;