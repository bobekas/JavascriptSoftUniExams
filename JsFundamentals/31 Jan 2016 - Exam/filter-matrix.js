function filterMatrix(input) {
    let sequenceLength = Number(input.pop())
    let allElements = input.join(' ').split(' ')

    let curSequenceLength = 1
    for (let i = 0; i < allElements.length - 1; i++) {
        if(allElements[i] === allElements[i + 1]) {
            curSequenceLength++
            if(curSequenceLength === sequenceLength) {
                for (let j = i + 1; j > i + 1 - sequenceLength; j--) {
                    allElements[j] = false
                }
                curSequenceLength = 1
            }
        } else {
            curSequenceLength = 1
        }
    }
    let index = 0
    input.forEach(line => {
        let curArrayLength = line.split(' ').length
        printArray(allElements.slice(index, index + curArrayLength).filter(el => el !== false))
        index += curArrayLength
    })
    function printArray(array) {
        console.log(array.length === 0 ? '(empty)' : array.join(' '))
    }
}

filterMatrix([
    '2 1 1 1',
    '1 1 1',
    '3 7 3 3 1',
    '2'
])