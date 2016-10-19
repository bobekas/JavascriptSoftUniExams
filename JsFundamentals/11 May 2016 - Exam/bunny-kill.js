function bunnyKill(input) {
    let bunnies = []
    let snowball = {
        dmg: 0,
        kills: 0
    }
    let bombs = input[input.length - 1].split(' ').map((bombCords) => {
        bombCords = bombCords.split(',').map(Number)
        return {
            x: bombCords[0],
            y: bombCords[1]
        }
    })
    for (let i = 0; i < input.length - 1; i++) {
        bunnies.push(input[i].split(' ').map(Number))
    }
    bombs.forEach((bomb) => {
        if(bunnies[bomb.x][bomb.y] > 0 ) {
            let bombDmg = bunnies[bomb.x][bomb.y]
            bunnies[bomb.x][bomb.y] = 0
            snowball.dmg += bombDmg
            snowball.kills++
            bombSplash(bomb.x, bomb.y, bombDmg)
        }
    })
    for (let i = 0; i < bunnies.length; i++) {
        for (let j = 0; j < bunnies[0].length; j++) {
            if(bunnies[i][j] > 0) {
                snowball.dmg += bunnies[i][j]
                snowball.kills++
            }
        }
    }
    function bombSplash(bombX, bombY, dmg) {
        applyDamage(bombX - 1, bombY, dmg)
        applyDamage(bombX - 1, bombY + 1, dmg)
        applyDamage(bombX - 1, bombY - 1, dmg)
        applyDamage(bombX + 1, bombY + 1, dmg)
        applyDamage(bombX + 1, bombY - 1, dmg)
        applyDamage(bombX + 1, bombY, dmg)
        applyDamage(bombX, bombY - 1, dmg)
        applyDamage(bombX, bombY + 1, dmg)
    }
    function applyDamage(x, y, dmg) {
        if(x >= 0 && x < bunnies.length && y >= 0 && y < bunnies[0].length) {
            bunnies[x][y] -= dmg
        }
    }
    console.log(snowball.dmg)
    console.log(snowball.kills)
}

bunnyKill([
    '5 10 15 20',
    '10 10 10 10',
    '10 15 10 10',
    '10 10 10 10',
    '2,2 0,1'
])