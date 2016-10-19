function spyMaster(input) {
    let specialKeyPattern = /^\s*[a-zA-Z]+$/
    let specialKey = input.shift()
    
    let symbols = new Map([
        ['!', 1],
        ['%', 2],
        ['#', 3],
        ['$', 4]
    ])

    if(specialKeyPattern.test(specialKey)) {
        let encodeMsgPattern = new RegExp(`((^| )${specialKey} +)([A-Z\!\%\$\#]{8,})(?=[., ]|$)`, 'ig')
        input.forEach(line => {
            let encodeMsgMatches
            while(encodeMsgMatches = encodeMsgPattern.exec(line)) {
                let startIndex = encodeMsgMatches.index
                let endIndex = encodeMsgMatches[0].length + encodeMsgMatches.index
                let start = encodeMsgMatches[1]
                let encodeMsg = encodeMsgMatches[3];
                let left = line.substring(0, startIndex)
                let right = line.substring(startIndex)
                if(!encodeMsg.match(/[a-z]/)) {
                    let decodeMsg = ''
                    for (let i = 0; i < encodeMsg.length; i++) {
                        if(symbols.has(encodeMsg[i])) {
                            decodeMsg += symbols.get(encodeMsg[i]).toString()
                        } else {
                            decodeMsg += encodeMsg[i]
                        }
                    }
                    right = right.replace(start + encodeMsg, start + decodeMsg.toLowerCase())
                    line = left + right
                }
            }
            console.log(line)
        })
    }
}

spyMaster([
    `tricky`,
    `And now the tricky tests`,
    `Tricky CAREFULL!#$%; with what you decode Tricky CAREFULL!#$%`,
    `Tricky HERECOMESDASH- with what you decode Tricky HERECOMESDASH -`,
    `Try again stricky NOTTHEFIRSTONE  tricky NOTTHEFIRSTONE`,
    `Be very carefull now trICkY plainwrong, trICkY PLAINWRONG`,
    `next challenge (tRickY SOME$WORDS) tRickY SOME$WORDS`,
    `It's tricky TOUSETHECORRECTREPLACE? tricky TOUSETHECORRECTREPLACE ,`,
    `now with commas triCky RAND!$OM%$#TE!#XT, triCky RAND!$OM%$#TE!#XT.`,
    `DON'T match this plz TRICKY | TEXT#TEXT. TRICKY  TEXT#TEXT.`,
    `Try with commas -triCkY COMMAHERE, triCkY COMMAHERE, wow`
])