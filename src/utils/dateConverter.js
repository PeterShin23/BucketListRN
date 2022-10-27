export default function convertDate(date) {
    let month = date.substring(4, 6)
    let day = date.substring(6, 8)
    if (month.charAt(0) == "0") {
        month = month.substring(1)
        console.log("hi")
    }
    if (day.charAt(0) == "0") {
        day = day.substring(1)
        console.log("hi")
    }
    
    return `${month}/${day}`
}