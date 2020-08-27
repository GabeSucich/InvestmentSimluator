const Utils = require("../strategyFuncs/utils/Utils");
const Suggestion = require("./utils/Suggestion");
const DateUtils = require("../../utils/dateUtils");
var switcher = "buy";

// finds 5% dip and buys with all money 
function activeTrading(res, symbol, portfolio, stockData, currentDate) {
    
    var buyDates = res[0];
    var sellDates = res[1];

    // console library.
    // console.log('buyLow running');
    // console.log('strat investAmt = ' + investmentAmt);
    // console.log("buyDate1 on strat = " + buyDatesPrev);
    // console.log("sellDates1 on strat = " + sellDatesPrev);
    // console.log("priceOnBuy on strat = " + priceOnBuy);
    // console.log("strat sellDate " + res.sellDateArr);
    // console.log("strat buyDate " + res.buyDateArr);
    // console.log('strat currDay = ' + currentDate);

    const suggestions = []

for (var i=0; i < buyDates.length; i++){
   if (currentDate === buyDates[i]) {

        // gives back the number of stocks to buy 
        const stockstoPurchase = Utils.maxStockPurchases(stockData[currentDate].markPrice, portfolio.getCash)
        console.log('buying ' + stockstoPurchase + ' stocks of ' + symbol + " on " + buyDates[i]);

        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, stockstoPurchase));
        // console.log('buying!');
    }


     if (currentDate === sellDates[i]) {

        // console.log('sell called');
        for (const stock of portfolio.holdings) {
        suggestions.push(Suggestion.createSellSuggestion(stock)); 
        console.log('selling ' + symbol + ' on ' + sellDates[i]);
        }
    }
}


return suggestions

}

module.exports = {
    "name": "activeTrading",
    "function": activeTrading
}
