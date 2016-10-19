function kitodar(input) {
    let materials = new Map([
        ['silver', 0],
        ['gold', 0],
        ['diamonds', 0]
    ])
    let minePattern = /mine .+ (diamonds|silver|gold)\s+:\s+([0-9]+)/

    input.forEach(line => {
        let match = minePattern.exec(line)
        if(match) {
            let [type, quantity] = [match[1], Number(match[2])]
            materials.set(type, materials.get(type) + quantity)
        }
    })
    materials.forEach((quantity, type) => console.log(`*${type.charAt(0).toUpperCase() + type.substring(1)}: ${quantity}`))
}

kitodar([
    'mine mina - gold - 5',
    'mine mina - silver - 5',
    'mine mina - diamonds : 5',
    'mine mina - gold:5'
])