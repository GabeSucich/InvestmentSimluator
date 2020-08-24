const Suggestion = require("./utils/Suggestion")

function volumeTrigger(actionDates, symbol, portfolio, stockData, currentDate) {
var buyDates = actionDates.buyDates
var sellDates = actionDates.sellDates
//     // Always have the final four parameters of your function as shown above

    var suggestionsArr = []

//     // Work/logic goes here

// If stockData.volume changed by 5% the previous day then start buying into the position. 

// First we'll have to buy a stock

if (!portfolio.purchased) {
    console.log("Looking to buy")
    portfolio.purchased = true
    // const stockstoPurchase = Utils.maxStockPurchases(stockData[currentDate].markPrice, portfolio.getCash)
    suggestionsArr.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, 1))

}
if (buyDates.includes(currentDate)) {
    console.log("buyDate:" + currentDate);
}
if (sellDates.includes(currentDate)) {
    console.log("sellDate:" + currentDate);
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

    "name": "volumeTrigger",
    "function": volumeTrigger
}

// create route to find days that find volume dates. Returns the dates to buy. Then run simulation, parameters are dates from 
// first route. Line 3 argument called buy dates. Line 13 if buydates includes the current date, then trigger a buy. 

// second route. figure out buys. return simulation data to client and then ChartHandler