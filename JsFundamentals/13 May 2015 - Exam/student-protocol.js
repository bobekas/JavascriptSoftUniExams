function studentProtocol(input) {
    let exams = {}
    
    input.forEach(line => {
        line = line.split(/:|-/g)
        if(line.length === 3) {
            let [studentName, examName, points] = line.map(el => el.trim())
            points = Number(points)
            if(points <= 400 && points >= 0) {
                if(!exams.hasOwnProperty(examName)) exams[examName] = []
                let student = exams[examName].find(el => el.name === studentName)
                let indexOfStudent = exams[examName].indexOf(student)
                if(student === undefined) {
                    indexOfStudent = exams[examName].length
                    student = {
                        name: studentName,
                        result: points,
                        makeUpExams: 0
                    }
                } else {
                    student.makeUpExams++
                    if(points > student.result) {
                        student.result = Math.min(points, 400)
                    }
                }
                exams[examName][indexOfStudent] = student
            }
        }
    })

    for (let examName in exams) {
        exams[examName] = exams[examName].sort((curStudent, nextStudent) => {
            if(curStudent.result < nextStudent.result) return 1
            if(curStudent.result > nextStudent.result) return -1
            if(curStudent.makeUpExams > nextStudent.makeUpExams) return 1
            if(curStudent.makeUpExams < nextStudent.makeUpExams) return -1
            return curStudent.name.localeCompare(nextStudent.name)
        })
    }
    console.log(JSON.stringify(exams))
}

studentProtocol([
    'asd Jackson - Java : 0',
    'asd Jackson - Java : 1',
    'baba Jackson - Java : 1',
    'Peter Jackson - Java : 400',
    'Peter Jackson - Java : 350',
    'Peter Jackson - Java : 360',
    'Jane - JavaScript : 200',
    'Jane     -    JavaScript :     400',
    'Simon Cowell - PHP : 100',
    'Simon Cowell-PHP: 500',
    'Simon Cowell - PHP : 200'
])