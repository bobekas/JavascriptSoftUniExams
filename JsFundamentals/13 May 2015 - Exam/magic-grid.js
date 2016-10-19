function magicGrid(input) {
    let encryptMsg = input.shift()
    let magicNumber = Number(input.shift())
    let matrix = input.map(row => row.split(' ').map(Number))

    let rowsAndColsSum = getSum(matrix)
    let decryptMsg = ''

    for (let i = 0; i < encryptMsg.length; i++) {
        let newSymbol = i % 2 ? String.fromCharCode(encryptMsg.charCodeAt(i) - rowsAndColsSum): String.fromCharCode(encryptMsg.charCodeAt(i) + rowsAndColsSum)
        decryptMsg += newSymbol
    }

    console.log(decryptMsg)

    function getSum(matrix) {
        let rowsAndColsSum
        let matrixWidth = matrix.length > 0 ? matrix[0].length : 0

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrixWidth; j++) {
                rowsAndColsSum = sumEqualToMagicNumber(i, j, matrixWidth, matrix)
                if(rowsAndColsSum) return rowsAndColsSum
            }
        }
    }
    function sumEqualToMagicNumber(row, col, matrixWidth, matrix) {
        let firstNum = matrix[row][col]

        for (let i = row; i < matrix.length; i++) {
            for (let j = i === row ? col + 1 : 0; j < matrixWidth; j++) {
                if(firstNum + matrix[i][j] === magicNumber) {
                        return i + j + row + col
                }
            }
        }
    }
}

magicGrid([
    'EfqfNhmnkynn%`fn~',
    '100',
    '200 100 120 300',
    '100 90 300 100',
    '150 290 370 100',
    '10 11 100 100'
])