function medankaWars(array) {
    let attacks = array.map((line) => {
        line = line.toLowerCase().split(' ')
        return {
            side: line[1],
            medankaCount: Number(line[0])
        }
    })
    let vitkor = {
        damageDealt: 0,
        prevDmg: 0,
        sequenceAttacks: 0
    }
    let naskor = {
        damageDealt: 0,
        prevDmg: 0,
        sequenceAttacks: 0
    }
    let currentAttackDmg
    let multiplier = 1

    attacks.forEach((attack) => {
        currentAttackDmg = attack.medankaCount * 60
        multiplier = 1
        if(attack.side === 'white') {
            if(attack.medankaCount * 60 === vitkor.prevDmg) {
                vitkor.sequenceAttacks++
                if(vitkor.sequenceAttacks === 2) {
                    vitkor.sequenceAttacks = 0
                    multiplier = 2.75
                }
            } else {
                vitkor.sequenceAttacks = 1
                vitkor.prevDmg = currentAttackDmg
            }
            vitkor.damageDealt += 60 * attack.medankaCount * multiplier
        } else {
            if(attack.medankaCount * 60 === naskor.prevDmg) {
                naskor.sequenceAttacks++
                if(naskor.sequenceAttacks === 5) {
                    naskor.sequenceAttacks = 1
                    naskor.prevDmg = currentAttackDmg * 4.5
                    multiplier = 4.5
                }
            } else {
                naskor.sequenceAttacks = 1
                naskor.prevDmg = currentAttackDmg
            }
            naskor.damageDealt += 60* attack.medankaCount * multiplier
        }
    })
    if(naskor.damageDealt > vitkor.damageDealt) {
        console.log(`Winner - Naskor`)
        console.log(`Damage - ${naskor.damageDealt}`)
    } else {
        console.log(`Winner - Vitkor`)
        console.log(`Damage - ${vitkor.damageDealt}`)
    }
}

medankaWars([
    '2 dark medenkas',
    '1 white medenkas',
    '2 dark medenkas',
    '2 dark medenkas',
    '15 white medenkas',
    '2 dark medenkas',
    '2 dark medenkas'

])