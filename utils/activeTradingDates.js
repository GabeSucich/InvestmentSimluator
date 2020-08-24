const ActiveUtils = require("../utils/dateUtils");

const ActiveDateUtils = {

    activeTrading(stockData, startDate, endDate, symbol, blPerc, bhPerc, slPerc, shPerc) {
        ​
        var buying = true
        const buyDates = []
        const sellDates = []
        var currentMax = null;
        var currentMin = null;
        var initalPrice = null;

        // returns an array of all dates in range
        var dateArr = Object.keys(stockData);
        const totalLenth = dateArr.length​;

        // goes through all dates to buy or sell
        while (dateArr.length > 0) {
            if (buying) {
                nextBuyDate(dateArr)

            } else {
                findSellDate(dateArr)
            }
        }​​​

        function nextBuyDate(dateArr) {
            var date1 = ActiveUtils.findBuyDateLow(stockData, dateArr, priceDecrease)
            var date2 = findRunawayBuyDate(stockData, dateArr, priceIncrease)

            if (date1 < date2) {
                buyDates.push(date1)
                dateArr = fastForwardHistory(dateArr, date1)
                buying = false
            }​
            else {
                buyDates.push(date2)
                dateArr = fastForwardHistory(dateArr, date2)
                buying = false
            }​
        }​
        function findSellDate(dateArr) {
            ​}​
        return {
            sellDates: sellDates,
            buyDates: buyDates
        }​

        ​
    }​,
    findBuyDate(stockHistory, priceDecrease) {
        return "date"
    }​,

    findRunawayBuyDate(stockHistory, priceIncrease) {
        return "date"
    }​,

    fastForwardHistory(stockHistory, date) {
        const indexOfDate = stockHistory.indexOf(date)
        return stockHistory.slice(indexOfDate)
    }

}​​​

console.log(numState(5));

module.exports = ActiveDateUtils;

