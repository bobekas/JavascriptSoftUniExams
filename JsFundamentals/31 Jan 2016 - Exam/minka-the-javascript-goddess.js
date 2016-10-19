function solve(input) {
    let tasks = {}
    input.forEach(line => {
        let [taskName, taskType, taskNumber, taskScore, taskLinesOfCode] = line.split(' & ')
        if(!tasks.hasOwnProperty(`Task ${taskNumber}`)) {
            tasks[`Task ${taskNumber}`] = {
                tasks: [],
                average: [],
                lines: 0
            }
        }
        tasks[`Task ${taskNumber}`].tasks.push({
            name: taskName,
            type: taskType
        })
        tasks[`Task ${taskNumber}`].average.push(Number(taskScore))
        tasks[`Task ${taskNumber}`].lines += Number(taskLinesOfCode)

    })
    for (let key in tasks) {
        tasks[key].average = Number((tasks[key].average.reduce((cur, next) => cur + next) / tasks[key].average.length).toFixed(2))
    }
    let tasksKeys = Object.keys(tasks).sort((a, b) => sortTasks(a, b, tasks))
    let sortedTasks = {}
    tasksKeys.forEach(key => {
        tasks[key].tasks = tasks[key].tasks.sort((a, b) => {
            if(a.name > b.name) return 1
            if(a.name < b.name) return -1
            return 0
        })
        sortedTasks[key] = tasks[key]
    })
    console.log(JSON.stringify(sortedTasks))

    function sortTasks(a, b, tasks) {
        if(tasks[a].average < tasks[b].average) return 1
        if(tasks[a].average > tasks[b].average) return -1
        return tasks[a].lines - tasks[b].lines
    }
}

solve([
    'Array Matcher & strings & 4 & 100 & 38',
    'Magic Wand & draw & 3 & 100 & 15',
    'Dream Item & loops & 2 & 88 & 80',
    'Knight Path & bits & 5 & 100 & 65',
    'Basket Battle & conditionals & 2 & 100 & 120',
    'Torrent Pirate & calculations & 1 & 100 & 20',
    'Encrypted Matrix & nested loops & 4 & 90 & 52',
    'Game of bits & bits & 5 &  100 & 18',
    'Fit box in box & conditionals & 1 & 100 & 95',
    'Disk & draw & 3 & 90 & 15',
    'Poker Straight & nested loops & 4 & 40 & 57',
    'Friend Bits & bits & 5 & 100 & 81'
])