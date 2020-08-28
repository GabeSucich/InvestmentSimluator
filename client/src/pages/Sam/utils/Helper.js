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

}

export default Helper