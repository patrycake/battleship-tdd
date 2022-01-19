let dom = (() => {
    function displayBoard(board, handleClick) {
        let userBoard = document.getElementById(board);
        for (let row = 0; row < 10; row++) {
            let colD;
            let rowD = document.createElement('div')
            rowD.classList.add("row")
            for (let col = 0; col < 10; col++) {
                colD = document.createElement('div')
                if(board == "attack-board") colD.classList.add("col-attack")
                colD.classList.add("col")
                colD.dataset.row = row;
                colD.dataset.col = col;
                colD.addEventListener("click", handleClick)
                rowD.appendChild(colD)
            }
            userBoard.appendChild(rowD)
        }
    }

    function displayShips(board, ships){
        let userBoard = document.getElementById(board);
        ships.forEach(shipInfo => {
            shipInfo.position.forEach(coor => {
                userBoard.childNodes[coor[0]].childNodes[coor[1]].style.backgroundColor = "yellow"
            })
        });
    }


    return {
        displayBoard, 
        displayShips
    }
})()

module.exports = dom;