
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

    reorderHistoricals(historicalData) {
        const HistoryArr = []

        // This boolean flag will help us to not iterate over giant portions of unnecessary data after get get the historicals we need

        // We are going to iterate through each date in the historical data. If it is within the date interval, we will add it.
        for (const [date, stockData] of Object.entries(historicalData)) {
            HistoryArr.push({ date: date, data: stockData })

            // When we step out of time interval, this statement will break us out of the loop. If we are looking for data between 2010 and 2020,
            //  this flag will stop us from unnecessary iterating over all the dates between 1999 and 2009 in the historical data.
        }

        const History = {}

        // We read the data from the API call in reverse chronological order. Here, we reverse this order
        for (var i = HistoryArr.length - 1; i >= 0; i--) {
            var dataPoint = HistoryArr[i]
            History[dataPoint.date] = dataPoint.data
        }

        return History
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
        return this.reorderHistoricals(historicals)
    },

    boundHistoricals(historicals, startDate, endDate) {
        const boundedHistoricals = {}
        var foundInterval = false
        for (const [date, data] of Object.entries(historicals)) {
            if (this.isInRange(startDate, endDate, date)) {
                foundInterval = true
                boundedHistoricals[date] = data
            }
            else if (foundInterval) {
                break
            }
        }
        return boundedHistoricals
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
    },

    // takes in an integer (5) and returns the decimal equivalent subtracted from 100% (.95)
    calcPercentChange(percent) {
    var firstStep = 100 - percent;
    var secondStep = firstStep * 0.01;
    return secondStep;
    },

    // function takes in date range determines current high price
    findBuyDate(stockData, startDate, endDate, percent) {
        console.log("dateUtils percent = " + parseInt(percent));
        console.log('findBuyDate running');
        var highPrice = 0;
        var buyPrice;
        const dateArr = Object.keys(stockData);

       var percentOf = this.calcPercentChange(percent);
    //    console.log('percentOf dateUtils = ' + percentOf);

        // iterate through dates
        for (const date of dateArr) {

            if (this.isInRange(startDate, endDate, date)) {
                // find the price for each day
                const currentPrice = eval(stockData[date]["markPrice"]);
                console.log('currentDay = ' + date + ' currentPrice = ' + currentPrice + ' highPrice = ' + highPrice + ' buyPrice = ' + buyPrice);

                // if that price is greater than the previous day, make new high
                if (currentPrice > highPrice) {
                    highPrice = currentPrice;
                    buyPrice = (highPrice * percentOf).toFixed(2);
                }

                // if the current price is 5% less than high price - push date
                if (currentPrice <= buyPrice) {


                    // once it finds the first dip date, stop searching
                    console.log("buy date Utils = " + date);
                    return [date, buyPrice];
                }
            }
        }
        return endDate;
    },
}



module.exports = DateUtils

