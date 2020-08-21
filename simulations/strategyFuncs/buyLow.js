const Suggestion = require("./utils/Suggestion");
const Utils = require("./utils/Utils");

// finds 5% dip and buys with all money 
function buyLow(investmentAmt, symbol, portfolio, stockData, currentDate) {

    console.log('strat investAmt = ' + investmentAmt)
    const suggestions = []
    const buyDate = Utils.findBuyDate(stockData);
    console.log("buyDate on strat = " + buyDate);
    // var cashCopy = portfolio.getCash;
    // console.log('strat cash copy = ' + cashCopy);

    var priceOnBuy = stockData[buyDate]["markPrice"];
    console.log("priceOnBuy = " + priceOnBuy);


   if (priceOnBuy < investmentAmt) {
        // gives back the number of stocks to buy 
        var amtToPurchase = Utils.maxStockPurchases(priceOnBuy, investmentAmt);
        console.log('buying ' + amtToPurchase + ' stocks on ' + buyDate);

        suggestions.push(Suggestion.createBuySuggestion(symbol , stockData, buyDate, amtToPurchase));
    }
return suggestions

}

module.exports = {
    "name": "buyLow",
    "function": buyLow
}
