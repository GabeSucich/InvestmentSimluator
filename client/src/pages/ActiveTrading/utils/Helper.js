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
  
    process(str){
        var strInt = parseInt(str);
        console.log(strInt)
        console.log(Number.isInteger(strInt));
        if (strInt < 0) strInt = 0;
        if (strInt > 100) strInt = 100;
        console.log('helper stringInt = ' + strInt);
        return (strInt);
  
    },


    verifyInt(str) {

        if (str === undefined) {
            console.log('helper string undefined');
            return
        } else if (str === null) {
            console.log('helper string is null');
            return
        } else {
            console.log('helper, passes first tests ' + str);
            return this.process(str);
        }
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