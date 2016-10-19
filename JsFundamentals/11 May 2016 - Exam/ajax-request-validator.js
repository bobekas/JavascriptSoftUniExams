function ajaxRequestValidator(arr) {
    let regexHashPattern = /(\d+)([a-zA-Z]{1})/g
    let hashPattern = {
        full: arr.pop(),
        patterns: [],
        matches: null
    }
    while((hashPattern.matches = regexHashPattern.exec(hashPattern.full)) !== null) {
        hashPattern.patterns.push({
            symbol: hashPattern.matches[2],
            count: Number(hashPattern.matches[1])
        })
    }

    let methodPattern = /^Method: (GET|POST|PUT|DELETE)$/
    let authPattern = /^Credentials: (Bearer|Basic) ([a-zA-Z0-9]+)$/
    let contentPattern = /^Content: ([a-zA-Z0-9.]+)$/

    let request = null

    for (let i = 0; i < arr.length; i += 3) {
        arr[i] = arr[i]
        let methodMatches = methodPattern.exec(arr[i])
        let authMatches = authPattern.exec(arr[i + 1])
        let contentMatches = contentPattern.exec(arr[i + 2])

        if(methodMatches === null || authMatches === null || contentMatches === null) {
            console.log(`Response-Code:400`)
            continue
        }

        request = {
            method: methodMatches[1],
            authType: authMatches[1],
            authContent: authMatches[2]
        }

        if(request.method !== 'GET' && request.authType !== 'Bearer') {
            console.log(`Response-Method:${request.method}&Code:401`)
            continue
        }

        if(checkAuth(request)) {
            console.log(`Response-Method:${request.method}&Code:200&Header:${request.authContent}`)
        } else {
            console.log(`Response-Method:${request.method}&Code:403`)
        }
    }
    function checkAuth(request) {
        for (let i = 0; i < hashPattern.patterns.length; i++) {
            let patternSymbol = hashPattern.patterns[i].symbol.toLowerCase()
            let patternCount = hashPattern.patterns[i].count

            let symbolCount = 0
            for (let j = 0; j < request.authContent.length; j++) {
                if(patternSymbol === request.authContent[j].toLowerCase()) {
                    symbolCount++
                }
            }
            if(symbolCount === patternCount) {
                return true
            }
        }
        return false
    }
}


ajaxRequestValidator(
    ['Method: PUT',
        'Credentials: Bearer as9133jsdbhjslkfqwkqiuwjoxXJIdahefJAB',
        'Content: users.asd/1782452$278///**asd123',
        'Method: POST',
        'Credentials: Bearer 028591u3jtndkgwndskfjwlfqkjwporjqbhas',
        'Content: Johnathan',
        'Method: DELETE',
        'Credentials: Bearer 05366u3jtndkgwndssfsfgeryerrrrrryjihvx',
        'Content: This.is.a.sample.content',
        '0e']
)