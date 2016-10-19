function spyMaster(input) {
    let specialKey = input.shift()

    let symbols = new Map([
        ['!', 1],
        ['%', 2],
        ['#', 3],
        ['$', 4]
    ])

    let specialKeyPat = new RegExp(`(^| )(${specialKey})`, 'ig')
    input.forEach(line => {
        let specKeyMatches
        while (specKeyMatches = specialKeyPat.exec(line)) {
            let fullPat = new RegExp(`^(${specKeyMatches[2]} +)([A-Z\!\%\$\#]{8,})(?=[., ]|$)`, 'g')
            let matches = fullPat.exec(line.substring(specKeyMatches.index + specKeyMatches[1].length))
            if(matches) {
                let [start, encode] = [matches[1], matches[2]]
                let decodeMsg = ''
                for (let i = 0; i < encode.length; i++) {
                    if(symbols.has(encode[i])) {
                        decodeMsg += symbols.get(encode[i]).toString()
                    } else {
                        decodeMsg += encode[i]
                    }
                }
                line = line.replace(start + encode, start + decodeMsg.toLowerCase())
            }
        }    
        console.log(line)
    })
}

spyMaster([
    'specialKey',
    'In this text the specialKey HELLOWORLD! is correct, but',
    'the following specialKey $HelloWorl#d and spEcIaLKEy HOLLOWORLD1 are not, while specialkey',
    'specialkey           \n                  !!!!!!!!!!!!!!! -SpeCIaLkeY  YSpECIaLkeY SOM%%ETTH$IN SPECIALKEY ##$A$##$$ specialkey ##$a$##$$'

])