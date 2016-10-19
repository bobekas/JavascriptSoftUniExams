function arithmepile(input) {
    input = input.map(Number)
    let biggestMultiplication = -Infinity
    input.forEach((number, index) => {
        if(number >= 0 && number < 10) {
            let result = multiplySequence(index + 1, number)
            if(result > biggestMultiplication) {
                biggestMultiplication = result
            }
        }
    })
    
    console.log(biggestMultiplication)

    function multiplySequence(start, count) {
        if(start + count > input.length) return -Infinity;
        let sum = 1;
        for (let i = start; i < start + count; i++) {
            sum *= input[i]
        }
        return sum
    }
}

arithmepile([
    '100',
    '200',
    '2',
    '3',
    '2',
    '3',
    '2',
    '1',
    '1'
])