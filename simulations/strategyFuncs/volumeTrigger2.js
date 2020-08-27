const Suggestion = require("./utils/Suggestion")
const Utils = require("./utils/Utils")

function volumeTrigger2(actionDates, sellPercent, holdPercent, recordLength, symbol, portfolio, stockData, currentDate) {
    var buyDates = actionDates.buyDates
    var sellDates = actionDates.sellDates
    //     // Always have the final four parameters of your function as shown above

    var suggestionsArr = []

    //     // Work/logic goes here

    // If stockData.volume changed by 5% the previous day then start buying into the position. 

    // First we'll have to buy a stock

    // if (!portfolio.initialBuy) {
    //     console.log(buyDates, sellDates)
    //     portfolio.initialBuy = true
    //     var stockPrice = eval(stockData[currentDate].markPrice)
    //     var stockAmt = Utils.maxStockPurchases(stockPrice, portfolio.getCash * holdPercent / 100)
    //     suggestionsArr.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, stockAmt))

    // }

    if (buyDates.includes(currentDate)) {

        console.log("Record length: " + recordLength)
        console.log(`----------------- Buy on ${currentDate} ------------------`)
        console.log("Mark price = " + stockData[currentDate].markPrice)

        portfolio.bought = true
        const stockPrice = eval(stockData[currentDate].markPrice)
        const stockAmt = Utils.maxStockPurchases(stockPrice, portfolio.getCash)
        console.log("Buying " + stockAmt + " stock")
        suggestionsArr.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, quantity = stockAmt))
    }

    if (sellDates.includes(currentDate)) {

        console.log(`----------------- Sell on ${currentDate} ------------------`)
        console.log("Mark price = " + stockData[currentDate].markPrice)

        for (const stock of portfolio.holdings) {

        
            // if (stock.percentChange >= sellProfitPercent || (-1)*stock.percentChange > sellLossPercent) {
                suggestionsArr.push(Suggestion.createSellSuggestion(stock))
            // }
        }


    }
    

    


    // console.log(stockData);


    // Then we will want to monitor any changes in volume say over 10% from the previosu day. This will give us an
    // indicator that large intstitutional investors are buying into the postion. We should be able to ride this trend
    //  for consistent gains

    // currentDate = "2014-08-07"
    // Day 1 compared to Day 0 volume. greater then 10% buy into position over the next 2-3 years
    // if (((stockData.volume [of day 0] - stockData.volume [day 1]) / 100) > .10 )
    // suggestionsArr.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate))


    // if (currentDate === "2020-08-10") {
    //     suggestionsArr.push(Suggestion.createSellSuggestion(portfolio.holdings[0]))
    // }


    return suggestionsArr

}

module.exports = {

    "name": "volumeTrigger2",
    "function": volumeTrigger2
}

// create route to find days that find volume dates. Returns the dates to buy. Then run simulation, parameters are dates from 
// first route. Line 3 argument called buy dates. Line 13 if buydates includes the current date, then trigger a buy. 

// second route. figure out buys. return simulation data to client and then ChartHandler