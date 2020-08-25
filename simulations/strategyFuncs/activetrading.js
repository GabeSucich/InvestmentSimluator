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
    console.log("buyDate on strat = " + buyDates);
    console.log("sellDates on strat = " + sellDates);
    // console.log("priceOnBuy on strat = " + priceOnBuy);
    // console.log("strat sellDate " + res.sellDateArr);
    // console.log("strat buyDate " + res.buyDateArr);
    // console.log('strat currDay = ' + currentDate);


 

    const suggestions = []


   if (buyDates && (switcher = "buy")) {

        var switcher = "sell"; 

        // gives back the number of stocks to buy 
        const stockstoPurchase = Utils.maxStockPurchases(stockData[currentDate].markPrice, portfolio.getCash)
        // console.log('buying ' + stockstoPurchase + ' stocks of ' + symbol + " on " + buyDates);

        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, stockstoPurchase));
    }

    // if (sellDates && (switcher === "sell")) {

    //     // console.log('sell called');
    //     suggestions.push(Suggestion.createSellSuggestion(symbol, "all"));
    // }


return suggestions

}

module.exports = {
    "name": "activeTrading",
    "function": activeTrading
}
