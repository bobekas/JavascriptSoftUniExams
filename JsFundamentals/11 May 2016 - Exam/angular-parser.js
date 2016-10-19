function angularParser(arr) {
    let appPattern = /app=['"](.+)['"]/
    let contentPattern = /['"](.+)['"]&app/
    let modules = {}
    let tempData = {}

    for (let i = 0; i < arr.length; i++) {
        let indexOfSplit = arr[i].indexOf('=')
        arr[i] = {
            type: arr[i].substr(0, indexOfSplit),
            content: arr[i].substr(indexOfSplit + 1)
        }
        parseElementsTypes(arr[i].type, arr[i].content)
    }

    addTempDataToModules()
    convertModulesObjectsToArray()

    modules.sort(modulesOrder)
    let output = '{'

    for (let i = 0; i < modules.length; i++) {
        let appName = modules[i][0]
        let appElements = modules[i][1]
        appElements.views = appElements.views.sort(alphabeticalOrder).map((view) => {
            return `"${view}"`
        })
        appElements.models = appElements.models.sort(alphabeticalOrder).map((model) => {
            return `"${model}"`
        })
        appElements.controllers = appElements.controllers.sort(alphabeticalOrder).map((controller) => {
            return `"${controller}"`
        })
        output += `"${appName}":`
        output += `{"controllers":[${appElements.controllers.join(',')}],`
        output += `"models":[${appElements.models.join(',')}],`
        output += `"views":[${appElements.views.join(',')}]},`
    }

    console.log(output.substr(0, output.length - 1) + '}')

    function convertModulesObjectsToArray() {
        let sortable = []
        for(let appName in modules) {
            sortable.push([appName, modules[appName]])
        }
        modules = sortable
    }

    function addTempDataToModules() {
        for(let appName in tempData) {
            if(modules.hasOwnProperty(appName)) {
                modules[appName].models = modules[appName].models.concat(tempData[appName].models)
                modules[appName].views = modules[appName].views.concat(tempData[appName].views)
                modules[appName].controllers = modules[appName].controllers.concat(tempData[appName].controllers)
            }
        }
    }

    function modulesOrder(a, b) {
        if(b[1].controllers.length - a[1].controllers.length === 0) {
            return a[1].models.length - b[1].models.length
        } else if(b[1].controllers.length - a[1].controllers.length >= 0) {
            return 1
        } else {
            return -1
        }
    }

    function alphabeticalOrder(a, b) {
        if(a > b) {
            return 1
        } else if(a < b) {
            return -1
        }
        return 0
    }

    function parseElementsTypes(type, content) {
        if(type === '$app') {
            modules[content.replace(/['"]/gi, '')] = {
                models: [],
                controllers: [],
                views: []
            }
        } else {
            let elementContent = contentPattern.exec(content)[1]
            let appName = appPattern.exec(content)[1]

            if(modules.hasOwnProperty(appName)) {
                addElementToApp(appName, type, elementContent)
            } else {
                addTempElement(appName, type, elementContent)
            }
        }
    }

    function addTempElement(appName, type, content) {
        tempData[appName] = tempData[appName] || {
                controllers: [],
                models: [],
                views: []
            }
        switch (type) {
            case '$model':
                tempData[appName].models.push(content)
                break
            case '$view':
                tempData[appName].views.push(content)
                break
            case '$controller':
                tempData[appName].controllers.push(content)
                break
        }
    }

    function addElementToApp(appName, type, content) {
        switch (type) {
            case '$model':
                modules[appName].models.push(content)
                break
            case '$view':
                modules[appName].views.push(content)
                break
            case '$controller':
                modules[appName].controllers.push(content)
                break
        }
    }
}

angularParser([
    "$controller='PHPController'&app='Language Parser'",
    "$controller='JavaController'&app='Language Parser'",
    "$controller='C#Controller'&app='Language Parser'",
    "$controller='C++Controller'&app='Language Parser'",
    "$app='Garbage Collector'",
    "$controller='GarbageController'&app='Garbage Collector'",
    "$controller='SpamController'&app='Garbage Collector'",
    "$app='Language Parser'"

])