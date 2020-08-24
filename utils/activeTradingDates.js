const ActiveDateUtils = {

    activeTrading(stockHistory) {
        ​
        var buying = true
        const buyDates = []
        const sellDates = []
        var currentMax = null;
        var currentMin = null;
        var initalPrice = null;
        var relevantStockHistory = Object.keys(stockHistory)
        const totalLenth = relevantStockHistory.length​
        while (relevantStockHistory.length > 0) {
            if (buying) {
                nextBuyDate(relevantStockHistory)

            } else {
                findSellDate(relevantStockHistory)
            }
        }​​​
        function nextBuyDate(relevantStockHistory) {
            var date1 = findBuyDate(relevantStockHistory, priceDecrease)
            var date2 = findRunawayBuyDate(relevantStockHistory, priceIncrease)

            if (date1 < date2) {
                buyDates.push(date1)
                relevantStockHistory = fastForwardHistory(relevantStockHistory, date1)
                buying = false
            }​
            else {
                buyDates.push(date2)
                relevantStockHistory = fastForwardHistory(relevantStockHistory, date2)
                buying = false
            }​
        }​
        function findSellDate(relevantStockHistory) {
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

