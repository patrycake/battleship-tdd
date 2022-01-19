const ship = require("./ship")
const EMPTY_PIECE = 'e';
const SHIP_PIECE = 's'
const MISSED_PIECE = 'm'


let gameBoard = (() =>{
    let board = new Array(10).fill(EMPTY_PIECE).map(() => new Array(10).fill(EMPTY_PIECE));
    let ships = []

    function placeAllShips(){
        let result;
        result = placeShip("carrier", [[3,4], [3,5], [3,6], [3,7], [3,8]])
        result = result && placeShip("battleship", [[0,5], [0,6], [0,7], [0,8]])
        result = result && placeShip("submarine", [[9, 2], [8,2], [7, 2]])
        result = result && placeShip("destroyer", [[3,1], [2,1]])
        return result;
        
    }

    function placeShip(name, arrPosition){
        
        let newShip = ship(name)
        let check = arrPosition.reduce((previous, current) => {
            if(previous && checkPosition(current)) return true
            return false;
        }, true)
        if(check){
            arrPosition.forEach(item =>{
                board[item[0]][item[1]] = SHIP_PIECE;
            })
            ships.push({"ship":newShip, "position":arrPosition})
        }
        return check;
    }

    function checkPosition(arr){
        if(arr[0] >= 10 || arr[0] < 0) return false
        if(arr[1] >= 10 || arr[1] < 0) return false
        if(board[arr[0]][arr[1]] == SHIP_PIECE) return false
        return true;
    }

    function receiveAttack(row, col){
        if(board[row][col] != SHIP_PIECE) {
            board[row][col] = MISSED_PIECE;
            return false;
        }
        ships.forEach(shipInfo => {
            shipInfo.position.forEach((coord, index) => {
                if(coord[0] == row && coord[1] == col) shipInfo.ship.hit(index)
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