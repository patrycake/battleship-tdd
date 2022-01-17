const ship = require("./ship")
const EMPTY_PIECE = 'e';
const SHIP_PIECE = 's'
const MISSED_PIECE = 'm'


let gameBoard = (() =>{
    let board = new Array(10).fill(EMPTY_PIECE).map(() => new Array(10).fill(EMPTY_PIECE));
    let ships = []

    function placeShip(name, arrPosition){
        let newShip = ship(name);
        ships.push({"ship":newShip, "position":arrPosition})
        let check = arrPosition.reduce((previous, current) => {
            if(previous || !checkPosition(current)) return false
            return true;
        }, true)
        if(check){
            arrPosition.forEach(item =>{
                board[item[0]][item[1]] = SHIP_PIECE;
            })
        }
        return check;
    }

    function checkPosition(arr){
        if(arr[0] >= 10 || arr[0] <= 0) return false
        if(arr[1] >= 10 || arr[1] <= 0) return false
        if(board[arr[0]][arr[1]] == SHIP_PIECE) return false
        return true;
    }

    function receiveAttack(x, y){
        if(board[x][y] != SHIP_PIECE) {
            board[x][y] = MISSED_PIECE;
            return false;
        }
        ships.forEach(shipInfo => {
            shipInfo.position.forEach((coord, index) => {
                if(coord[0] == x && coord[1] == y) shipInfo.ship.hit(index)
                // console.log(ship.ship)
            })
        })
        return true;
    }

    function checkForSunkenShips(){
        return !ships.some(shipInfo => {
            if(!shipInfo.ship.isSunk()) return true 
        })
    }

    return {
        placeShip,
        receiveAttack,
        checkForSunkenShips
    }
})


// let board = gameBoard();
// let position = [[1,1],[1,2],[1,3],[1,4]]
// board.placeShip(position)
// board.receiveAttack(1,2)
// board.checkForSunkenShips()

module.exports = gameBoard;