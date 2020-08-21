const Suggestion = require("./utils/Suggestion");
const Utils = require("./utils/Utils");

// finds 5% dip and buys with all money 
function buyLow(symbol, portfolio, stockData, currentDate) {

    const suggestions = []
    const buyDate = Utils.findBuyDate(stockData);
    console.log("buyDate on strat = " + buyDate);
    var cashCopy = portfolio.getCash;
    console.log('strat cash copy = ' + cashCopy);

    var priceOnBuy = stockData[buyDate]["markPrice"];
    console.log("priceOnBuy = " + priceOnBuy);


   if (priceOnBuy < cashCopy) {
        console.log('strat gonna BUY BOI');
        Utils.maxStockPurchases(priceOnBuy, cashCopy);

        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, buyDate));
        cashCopy -= stockData[buyDate]["markPrice"];
    }

}

module.exports = {
    "name": "buyLow",
    "function": buyLow
}
