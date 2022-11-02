export function convertDateToMMDDYYYY(date) {
    let month = date.substring(4, 6)
    let day = date.substring(6, 8)
    if (month.charAt(0) == "0") {
        month = month.substring(1)
    }
    if (day.charAt(0) == "0") {
        day = day.substring(1)
    }
    
    return `${month}/${day}`
}

export function convertDateToYYYYMMDD(date) {
    const tempDate = date.substring(10).split('/')
    let month = tempDate[0]
    let day = tempDate[1]
    let year = tempDate[2]

    if (month.length == 1) {
        month = `0${month}`
    }
    if (day.length == 1) {
        day = `0${day}`
    }

    return `${year}${month}${day}`
}

export function convertDateToDisplay(dateString) {
    let year = dateString.substring(0,4)
    let month = dateString.substring(4,6)
    let day = dateString.substring(6,8)
    if (month.charAt(0) == "0") {
        month = month.substring(1)
    }
    if (day.charAt(0) == "0") {
        day = day.substring(1)
    }

    return `Due date: ${month}/${day}/${year}`

}

export function convertCompletedDateToDisplay(completed, dateString) {
    if (completed && dateString != '') {
        let year = dateString.substring(0,4)
        let month = dateString.substring(4,6)
        let day = dateString.substring(6,8)
        if (month.charAt(0) == "0") {
            month = month.substring(1)
        }
        if (day.charAt(0) == "0") {
            day = day.substring(1)
        }

        return `Completed date: ${month}/${day}/${year}`
    } else {
        return 'Not Finished Yet!'
    }

}

export function convertCompletedDate(date) {
    const tempDate = date.split('/')
    let month = tempDate[0]
    let day = tempDate[1]
    let year = tempDate[2]

    if (month.length == 1) {
        month = `0${month}`
    }
    if (day.length == 1) {
        day = `0${day}`
    }

    return `${year}${month}${day}`
}