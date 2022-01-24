const ship = require("./ship")

let dom = ((userPlayer, compPlayer, userBoard, compBoard) => {

    let uPlayer = userPlayer;
    let cPlayer = compPlayer;
    let uBoard = userBoard;
    let cBoard = compBoard;
    let count = 0;
    let currentShip = ship().shipNames[count]
    let position = []

    function displayBoard(boardName, state) {
        let userBoard = document.getElementById(boardName);
        userBoard.innerHTML = "";
        for (let row = 0; row < 10; row++) {
            let colD;
            let rowD = document.createElement('div')
            rowD.classList.add("row")
            for (let col = 0; col < 10; col++) {
                colD = document.createElement('div')
                colD.classList.add("col")
                colD.dataset.row = row;
                colD.dataset.col = col;
                if (state == "placeships") placeShipsAttributes(colD, boardName)
                if (state == "attack") attackAttributes(colD, boardName)
                if (state == "nothing"){}
                rowD.appendChild(colD)
                userBoard.appendChild(rowD)
            }
        }

        userBoard.childNodes[0].childNodes[0].style.borderTopLeftRadius = "8px"
        userBoard.childNodes[0].childNodes[9].style.borderTopRightRadius = "8px"
        userBoard.childNodes[9].childNodes[0].style.borderBottomLeftRadius = "8px"
        userBoard.childNodes[9].childNodes[9].style.borderBottomRightRadius = "8px"
    }

    function displayShips(board, ships) {
        let userBoard = document.getElementById(board);
        ships.forEach(shipInfo => {
            shipInfo.position.forEach(coor => {
                userBoard.childNodes[coor[0]].childNodes[coor[1]].classList.add("ship")
            })
        });
    }

    function attackAttributes(col, boardName) {
        col.addEventListener("click", handleClickAttack)
        col.classList.add("col-attack")
    }

    function placeShipsAttributes(col, boardName) {
        let message = document.getElementById("message")
        message.innerText = `Place: ${currentShip.name} Size: ${currentShip.num}`

        col.addEventListener("mouseover", (e) => {
            let userBoard = document.getElementById("player-board")
            e.target.classList.add("ship-select")
            for (let i = 0; i < currentShip.num; i++) {
                userBoard.childNodes[parseInt(e.target.dataset.row) + i].childNodes[parseInt(e.target.dataset.col)].classList.add("ship-select")
            }
        })
        col.addEventListener("mouseleave", (e) => {
            let userBoard = document.getElementById("player-board")
            e.target.classList.add("ship-select")
            for (let i = 0; i < currentShip.num; i++) {
                userBoard.childNodes[parseInt(e.target.dataset.row) + i].childNodes[parseInt(e.target.dataset.col)].classList.remove("ship-select")
            }
        })
        col.addEventListener("click", (e) => {
            e.target.classList.add("ship-select")
            for (let i = 0; i < currentShip.num; i++) {
                position.push([parseInt(e.target.dataset.row) + i, parseInt(e.target.dataset.col)])
            } 
            uBoard.placeShip(currentShip.name, position)
            position = []
            displayShips("player-board", uBoard.ships)
            count++;
            if (count >= ship().shipNames.length) {
                displayBoard("player-board", "nothing")
                displayBoard("attack-board", "attack")
                displayShips("player-board", uBoard.ships)
                message.innerText = `Attack!`
            } 
            currentShip = ship().shipNames[count]
            message.innerText = `Place: ${currentShip.name} Size: ${currentShip.num}`
        })

    }

    function handleClickAttack(e) {
        if (uPlayer.play(cBoard, e.target.dataset.row, e.target.dataset.col)) {
            e.target.classList.add("hit")
            if (cBoard.checkForSunkenShips())
                document.getElementById("message").innerText = "You Win"
        } else {
            e.target.classList.add("miss")
        }
        if (compTurn())
            document.getElementById("message").innerText = "Computer Wins"
    }

    function compTurn() {
        let compPlay = cPlayer.randomPlay(uBoard)
        let userBoard = document.getElementById("player-board")
        if (compPlay.val) {
            userBoard.childNodes[compPlay.row].childNodes[compPlay.col].classList.remove("ship")
            userBoard.childNodes[compPlay.row].childNodes[compPlay.col].classList.add("hit")

        } else {
            userBoard.childNodes[compPlay.row].childNodes[compPlay.col].classList.add("miss")
        }
        return uBoard.checkForSunkenShips()
    }



    return {
        displayBoard,
        displayShips
    }
})

module.exports = dom;