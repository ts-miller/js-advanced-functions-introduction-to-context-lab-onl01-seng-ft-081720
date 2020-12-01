function createEmployeeRecord(array) {
    let record = {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : []
    }
    return record
}

function createEmployeeRecords(array) {
    const records = array.map( (e) => {
        return createEmployeeRecord(e)
    })
    return records
}

function createTimeInEvent(employee, dateStamp) {
    const date = dateStamp.split(' ')[0]
    const time = parseInt(dateStamp.split(' ')[1])
    const timeObj = {
        type : "TimeIn",
        hour : time,
        date : date
    }
    employee.timeInEvents.push(timeObj)
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    const date = dateStamp.split(' ')[0]
    const time = parseInt(dateStamp.split(' ')[1])
    const timeObj = {
        type : "TimeOut",
        hour : time,
        date : date
    }
    employee.timeOutEvents.push(timeObj)
    return employee
}

function hoursWorkedOnDate(obj, date) {
    const timeOut = obj.timeOutEvents.find((o) => {
        return o.date === date
    })
    const timeIn = obj.timeInEvents.find((o) => {
        return o.date === date
    })
    const hours = timeOut.hour - timeIn.hour
    return hours/100
}

function wagesEarnedOnDate(obj, date) {
    const wages = obj.payPerHour * hoursWorkedOnDate(obj, date)
    return wages
}

function allWagesFor(obj) {
    const dates = obj.timeInEvents.map((e) => {
        return e.date
    })
    const totalWages = dates.reduce((total, date) => {
        return total + wagesEarnedOnDate(obj, date)
    }, 0)
    return totalWages
}

function calculatePayroll(objs) {
    const totalWages = objs.reduce((total, obj) => {
        return total + allWagesFor(obj)
    }, 0)
    
    return totalWages
}

function findEmployeeByFirstName(objs, name) {
    return objs.find((obj) => {
        return obj.firstName == name
    })
}