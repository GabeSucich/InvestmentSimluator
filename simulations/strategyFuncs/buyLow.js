const Suggestion = require("./utils/Suggestion");
const Utils = require("./utils/Utils");

// finds 5% dip and buys with all money 
function buyLow(investmentAmt, buyDate, priceOnBuy, symbol, portfolio, stockData, currentDate) {

    // console library.
    // console.log('buyLow running');
    // console.log('strat investAmt = ' + investmentAmt);
    // console.log("buyDate on strat = " + buyDate);
    // console.log("priceOnBuy on strat = " + priceOnBuy);

    const suggestions = []


   if (priceOnBuy < investmentAmt) {

        // gives back the number of stocks to buy 
        var amtToPurchase = Utils.maxStockPurchases(priceOnBuy, investmentAmt);
        // console.log('buying ' + amtToPurchase + ' stocks on ' + buyDate);

        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, buyDate, amtToPurchase));
    }
return suggestions

}

module.exports = {
    "name": "buyLow",
    "function": buyLow
}
