function radicalMarketing(input) {
    let persons = {}

    let registerPattern = /^[A-Z]+$/
    let subscribePattern = /^([A-Z]+)\s*-\s*([A-Z]+)$/

    input.forEach(el => {
        let personName = el.match(registerPattern)
        if(personName) {
            if(!persons.hasOwnProperty(personName)) {
                persons[personName] = {
                    subscribes: 0,
                    followers: []
                }
            }
        } else {
            let subscribeMatch = subscribePattern.exec(el)
            if(subscribeMatch) {
                let [subscriber, personToSubscribe] = [subscribeMatch[1], subscribeMatch[2]]
                if(persons.hasOwnProperty(subscriber) && persons.hasOwnProperty(personToSubscribe)) {
                    let alreadyExist = persons[personToSubscribe].followers.find(name => name === subscriber)
                    if(!alreadyExist) {
                        persons[subscriber].subscribes++
                        persons[personToSubscribe].followers.push(subscriber)
                    }
                }
            }
        }
    })
    
    let personsName = Object.keys(persons)

    personsName.sort((cur, next) => {
        if(persons[cur].followers.length > persons[next].followers.length) return -1
        if(persons[cur].followers.length < persons[next].followers.length) return 1
        if(persons[cur].subscribes > persons[next].subscribes) return -1
        if(persons[cur].subscribes < persons[next].subscribes) return 1
        return 0
    })

    if(personsName.length > 0) {
        let personWithMostSubs = persons[personsName[0]]
        personWithMostSubs.name = personsName[0]

        console.log(personWithMostSubs.name)
        personWithMostSubs.followers.forEach((follower, index) => {
            console.log(`${index + 1}. ${follower}`)
        })
    }
}

radicalMarketing([
    'J',
    'G',
    'P',
    'R',
    'C',
    'J-G',
    'G-J',
    'P-R',
    'R-P',
    'C-J'
])