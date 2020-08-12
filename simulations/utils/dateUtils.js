
const Utils = {

// This function removes the dashes from a standard-formatted date. Useful for comparing which dates are ahead of which.
// removeDateDashes("2020-01-01") -> "20200101"
removeDateDashes(date) {
    var noDashes = ""
    for (const character of date) {
        if (character !== "-") {
            noDashes += character
        }
    }
    return noDashes
},

// This function will return true if the dateToCheck is not before the referenceDate, and false otherwise.
// isNotPast("2020-03-01", "2020-08-01") -> true
// isNotPast("2020-03-01", "2020-01-01") -> false
isNotBefore(referenceDate, dateToCheck) {
    if (parseInt(this.removeDateDashes(dateToCheck)) - parseInt(this.removeDateDashes(referenceDate)) >= 0) {
        return true
    }
    return false
},

//This function will return if the queryDate is in between the startDate and endDate
isInRange(startDate, endDate, queryDate) {
    if (this.isNotBefore(startDate, queryDate) && this.isNotBefore(queryDate, endDate)) {
        return true
    }
    return false
},

// The historicals come from the API with keys that are strangely formatted as, for example: "1. open", "2. close"
// MongoDB does not like keys containt ".", so this function removes the periods from the object keys for storage in the databse.
processHistoricals(historicals) {
    for (const [date, data] of Object.entries(historicals)) {
        for (const [key, value] of Object.entries(data)) {
            var newKey = key.slice(3)
            data[newKey] = value
            delete data[key]
        }
    }
}

}

module.exports = Utils

