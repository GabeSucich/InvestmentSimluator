const Helper = {

    removeDateDashes(date) {
        var noDashes = ""
        for (const character of date) {
            if (character !== "-") {
                noDashes += character
            }
        }
        return noDashes
    },

    isNotBefore(referenceDate, dateToCheck) {
        if (parseInt(this.removeDateDashes(dateToCheck)) - parseInt(this.removeDateDashes(referenceDate)) >= 0) {
            return true
        }
        return false
    },

    isInRange(startDate, endDate, queryDate) {
        if (this.isNotBefore(startDate, queryDate) && this.isNotBefore(queryDate, endDate)) {
            return true
        }
        return false
    },

    boundHistoricals(historicals, startDate, endDate=null) {
        const boundedHistoricals = {}

        if (!endDate) {
            for (const [date, data] of Object.entries(historicals)) {
                if (this.isNotBefore(startDate, date)) {
                    boundedHistoricals[date] = data
                }
            }
        }
        else {
            for (const [date, data] of Object.entries(historicals)) {
                if (this.isInRange(startDate, endDate, date)) {
                    boundedHistoricals[date] = data
                }
            }
        }
        return boundedHistoricals
    },

    findFirstDateInYear(historicals, year) {
        console.log(year)
        for (const [date, data] of Object.entries(historicals)) {
            if (date.slice(0,4) === year) {
                return date
            }
        }
        return null
    },

    findLastDateInYear(historicals, year) {
        const dates = Object.keys(historicals)
        var foundYear = false
        var previousDate;
        for (const date of dates) {

            var thisYear = date.slice(0,4)
            if (thisYear === year) {
                foundYear = false
            }
            else if (thisYear !== year && foundYear) {
                return previousDate
            }
            previousDate = date
        }

        return previousDate

    },

    findAvailableYears(historicals) {
        const years = []
        for (const [date, data] of Object.entries(historicals)) {
            const thisYear = date.slice(0,4)
            if (!years.includes(thisYear)) {
                years.push(thisYear)
            }
        }
        return years.slice(1)
    }


}

export default Helper