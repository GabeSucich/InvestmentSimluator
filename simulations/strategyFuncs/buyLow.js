const Suggestion = require("./utils/Suggestion");
const buyLowUtils = require("./utils/Utils");

// finds 5% dip and buys with all money 
function buyLow(symbol, portfolio, stockData, currentDate) {

    const suggestions = []
    const buyDate = buyLowUtils.findBuyDate(stockData, currentDate);
    console.log("buyDate = " + buyDate);
    var cashCopy = portfolio.getCash;


    while (stockData[buyDate]["markPrice"] < cashCopy) {
        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, buyDate));
        cashCopy -= stockData[buyDate]["markPrice"];
    }

}

module.exports = {
    "name": "buyLow",
    "function": buyLow
}
