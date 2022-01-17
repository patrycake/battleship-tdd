const ship = require("./ship");
const gameBoard = require("./board");

// Test Ship
test('Test hit()', () =>{
    expect(ship().hit(-2)).toBe(false)
})
test('Test hit()', () =>{
    expect(ship().hit(1)).toBe(true)
})
test('Test isSunk() with hit()', () =>{
    expect(ship().isSunk()).toBe(false)
})
test('Test isSunk()', () => {
    let testShip = ship();
    testShip.hit(0)
    testShip.hit(1)
    testShip.hit(2)
    testShip.hit(3)
    expect(testShip.isSunk()).toBe(true)
})

test('Test isSunk()', () => {
    let testShip = ship();
    testShip.hit(1)
    testShip.hit(2)
    testShip.hit(3)
    expect(testShip.isSunk()).toBe(false)
})

test('Test isSunk()', () => {
    let testShip = ship();
    testShip.hit(2)
    testShip.hit(3)
    expect(testShip.isSunk()).toBe(false)
})

//Test game board
test('Test gameboard place ship', () => {
    let board = gameBoard();
    let position = [[1,1],[1,2],[1,3],[1,4]]
    expect(board.placeShip(position)).toBe(true)
})

test('Test gameboard place ship with invalid coordinates', () => {
    let board = gameBoard();
    let position = [[-1,1],[-1,2],[-1,3],[-1,4]]
    expect(board.placeShip(position)).toBe(false)
})

test('Test gameboard place ship where a ship has already been placed', () => {
    let board = gameBoard();
    let position = [[1,1],[1,2],[1,3],[1,4]]
    expect(board.placeShip(position)).toBe(true)
    expect(board.placeShip(position)).toBe(false)
})

test('Test gameboard receiveAttack no ships', () => {
    let board = gameBoard();
    expect(board.receiveAttack(1,1)).toBe(false)
})

test('Test gameboard receiveAttack attack ship', () => {
    let board = gameBoard();
    let position = [[1,1],[1,2],[1,3],[1,4]]
    board.placeShip(position)
    expect(board.receiveAttack(1,1)).toBe(true)
})

test('Test gameboard receiveAttack attack ship on same spot', () => {
    let board = gameBoard();
    let position = [[1,1],[1,2],[1,3],[1,4]]
    board.placeShip(position)
    expect(board.receiveAttack(1,2)).toBe(true)
    expect(board.receiveAttack(1,2)).toBe(true)
})

test('Test gameboard receiveAttack attack with ship but not on ship', () => {
    let board = gameBoard();
    let position = [[1,1],[1,2],[1,3],[1,4]]
    board.placeShip(position)
    expect(board.receiveAttack(0,0)).toBe(false)
})

test('Test gameBoard checkForSunkenShips when ship is not sunken', () => {
    let board = gameBoard();
    let position = [[1,1],[1,2],[1,3],[1,4]]
    board.placeShip(position)
    expect(board.checkForSunkenShips()).toBe(false)
})

test('Test gameBoard checkForSunkenShips when all ships are sunken', () => {
    let board = gameBoard();
    let position = [[1,1],[1,2],[1,3],[1,4]]
    board.placeShip(position)
    board.receiveAttack(1,1)
    board.receiveAttack(1,2)
    board.receiveAttack(1,3)
    board.receiveAttack(1,4)
    expect(board.checkForSunkenShips()).toBe(true)
})
