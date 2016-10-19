function rossetaStone(input) {
    let templateMatrix = []
    let templateHeight = Number(input.shift())

    for (let i = 0; i < templateHeight; i++) {
        templateMatrix.push(input.shift().split(/\s+/g).map(Number))
    }

    let encodedMatrix = []
    let encodedMatrixHeight = input.length

    for (let i = 0; i < encodedMatrixHeight; i++) {
        encodedMatrix.push(input.shift().split(/\s+/g).map(Number))
    }

    let templateWidth = templateMatrix[0].length

    if(encodedMatrix.length > 0 && templateMatrix.length > 0) {
        for (let i = 0; i < encodedMatrix.length; i+=templateHeight) {
            for (let j = 0; j < encodedMatrix[0].length; j+=templateWidth) {
                sumCells(i, j)
            }
        }
        let text = ''
        for (let i = 0; i < encodedMatrix.length; i++) {
            for (let j = 0; j < encodedMatrix[0].length; j++) {
                if(encodedMatrix[i][j] === 0) {
                    text += ' '
                } else {
                    text += String.fromCharCode(encodedMatrix[i][j] + 64)
                }
            }
        }
        console.log(text)
    }

    function sumCells(row, col) {
        for (let i = 0; i < templateMatrix.length; i++) {
            for (let j = 0; j < templateMatrix[0].length; j++) {
                let curCellY = row + i
                let curCellX = col + j
                if(curCellX >= 0 && curCellY >= 0 && curCellX < encodedMatrix[0].length && curCellY < encodedMatrix.length) {
                    encodedMatrix[curCellY][curCellX] += templateMatrix[i][j]
                    encodedMatrix[curCellY][curCellX] %= 27
                }
            }
        }
    }
}

rossetaStone([
    '1',
    '1 3 13',
    '12 22 14 13 25 0 4 24 23',
    '18 24 2 25 22 0 0 11 18',
    '8 25 6 26 8 23 13 4 14',
    '14 3 14 10 6 1 6 16 14',
    '11 12 2 10 24 2 13 24 0',
    '24 24 10 14 15 25 18 24 12',
    '4 24 0 8 4 22 19 22 14',
    '0 11 18 26 1 19 18 13 15',
    '8 15 14 26 24 14 26 24 14'
    ]
)