function solve([firstText, secondText]) {
    let words = {}
    let extractedWords = []
    firstText.match(/[a-zA-Z]+/g).map(word => word.toLowerCase()).forEach(word => {
        if(!words.hasOwnProperty(word)) {
            words[word] = 0
        }
        words[word] ++
    })
    for (let word in words) {
        if(words[word] > 2) extractedWords.push(word)
    }
    if(extractedWords.length === 0) {
        console.log('No words')
        return
    }
    let sentences = secondText.match(/\w.+?(\?|\.|\!)/g)
    let extractedSentences = []
    for (let i = 0; i < sentences.length; i++) {
        let count = 0
        for (let j = 0; j < extractedWords.length; j++) {
            if(new RegExp(`\\b${extractedWords[j]}\\b`).test(sentences[i].toLowerCase())) {
                count++
            }
        }
        if(count > 1) {
            extractedSentences.push(sentences[i])
        }
    }
    if(extractedSentences.length === 0) {
        console.log('No sentences')
        return
    }
    for (let i = 0; i < extractedSentences.length; i++) {
        console.log(extractedSentences[i])
    }
}

solve(["Captain Obvious was walking down the street. As the captain was walking a person came and told him: You are Captain Obvious! He replied: Thank you CAPTAIN OBVIOUS you are the man!",
    "The captain was walking and he was obvious. He did not know what was going to happen to you in the future. Was he curious? We do not know.asdsada. THE the you."]
)