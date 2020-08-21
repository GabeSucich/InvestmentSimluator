
const DateUtils = {

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
            data["markPrice"] = ((eval(data.open) + eval(data.close)) / 2).toFixed(2)
        }
    },


    // Returns true if numDays have elapsed between the currentDate and the startDate.
    hasElapsed(numDays, currentDate, startDate) {

        if (new Date(currentDate).getTime() - new Date(startDate).getTime() > numDays * 86400000) {
            return true
        }

        return false

    },

    // Finds a date to section off the first 10 years of the history from the rest of the history. Used to determine when node should
    // clear stack
    findBreakDate(stockHistory, startDate) {
        for (const date of Object.keys(stockHistory)) {
            if (this.hasElapsed(3650, date, startDate)) {
                return date
            }
            
        }
        return null
    },


    findIntervalDates(stockHistory, startDate, endDate, interval) {
        const allDates = Object.keys(stockHistory);
        const actionDates = [];
        let foundInterval = false;
        let counter = 1;
        for (const date of allDates) {
            if (!this.isInRange(startDate, endDate, date) && foundInterval) {
                break;
            } else if (this.isInRange(startDate, endDate, date)) {
                foundInterval = true;
                if (counter >= parseInt(interval)) {
                    counter = 1;
                }
                if (counter === 1) {
                    actionDates.push(date);
                    counter += 1;
                } else {
                    counter += 1;
                }
            }
        }
        return actionDates;
    }



}



module.exports = DateUtils

