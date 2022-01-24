let Ship = ((name) =>{
    let position = [];
    let shipName = ''; 
    const shipNames = [
        {
            "name": "carrier",
            "num": 5
        },
        {
            "name": "battleship",
            "num": 4
        },
        {
            "name": "submarine",
            "num": 3
        },
        {
            "name": "destroyer",
            "num": 2
        },
        {
            "name": "destroyer",
            "num": 2
        },
        {
            "name": "patrol boat",
            "num": 1
        }
    ]

    shipNames.forEach(shipType => {
        if(shipType.name == name) {
            position = new Array(shipType.num).fill('o')
            shipName = shipType.name 
        }
    })

    function hit(positionNum){
        if(positionNum < position.length && positionNum >= 0){
            position[positionNum] = 'x'
            return true
        }
        return false;
    }

    function isSunk(){
        let val = position.reduce((previous, current) => {
            if(previous == 'o' || current == 'o') return 'o'
            else return 'x'
        }) == 'x'
        return val;
    }


    return {
        hit, 
        isSunk,
        shipNames
    }
})

module.exports = Ship;