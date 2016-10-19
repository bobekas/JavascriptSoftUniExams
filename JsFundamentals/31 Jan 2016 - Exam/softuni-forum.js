function softuniForum(input) {
    let bannedNames = input.pop().split(' ')
    let isCode = false
    let usernamePattern = /#([a-zA-Z][a-zA-Z0-9\-\_]+[a-zA-Z0-9])(?![a-zA-Z0-9\-\_#])/g

    input.forEach((line, index) => {
        if(line.includes('<code>') && input.slice(index).join(' ').includes('</code>')) {
            isCode = true
        }
        if(!isCode) {
            bannedNames.forEach(name => line = line.replace(new RegExp(`#${name}`, 'g'), '*'.repeat(name.length)))
            line = line.replace(usernamePattern, (match, username) => { return `<a href="/users/profile/show/${username}">${username}</a>`})
        }
        console.log(line)
        if(line.includes('</code>')) isCode = false
    })
}

softuniForum([
    '<code>',
    '#lele',
    '#pochna se </code>',
    '<code> #mani_begai #gosho <code>',
    'gosho'
])