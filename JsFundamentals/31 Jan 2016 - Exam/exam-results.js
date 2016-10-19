function examResults(input) {
    let averageCourseName = input.pop().trim()
    let courses = new Map()
    input.forEach(line => {
        let[studentName, courseName, examPoints, courseBounuses] = line.split(/\s+/).filter(el => el !== '')
        examPoints = Number(examPoints)
        courseBounuses = Number(courseBounuses)

        if(!courses.has(courseName)) courses.set(courseName, [])
        courses.get(courseName).push(examPoints)

        if(examPoints >= 100) {
            let coursePoints = Number((examPoints / 5 + courseBounuses).toFixed(2))
            let grade = Math.min(6, (coursePoints / 20)  + 2).toFixed(2)
            console.log(`${studentName}: Exam - "${courseName}"; Points - ${coursePoints}; Grade - ${grade}`)
        } else {
            console.log(`${studentName} failed at "${courseName}"`)
        }
    })
    let averageCourse = courses.get(averageCourseName)
    let averageCoursePoints = Number((averageCourse.reduce((cur, next) => cur + next) / averageCourse.length).toFixed(2))
    console.log(`"${averageCourseName}" average points -> ${averageCoursePoints}`)
}

examResults([
    'Pesho C#-Advanced 100 3',
    'Gosho Java-Basics 157 3',
    'Tosho HTML&CSS 317 12',
    'Minka C#-Advanced 57 15',
    'Stanka C#-Advanced 157 15',
    'Kircho C#-Advanced 300 0',
    'Niki C#-Advanced 400 10',
    'C#-Advanced'
])