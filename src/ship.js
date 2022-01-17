let Ship = (() =>{
    let position = ['o','o','o','o']

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
        isSunk
    }
})

module.exports = Ship;