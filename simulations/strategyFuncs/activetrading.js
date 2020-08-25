const Suggestion = require("./utils/Suggestion");
// finds 5% dip and buys with all money 
function activeTrading(res, symbol, portfolio, stockData, currentDate) {

    // console library.
    // console.log('buyLow running');
    // console.log('strat investAmt = ' + investmentAmt);
    // console.log("buyDate on strat = " + buyDate);
    // console.log("priceOnBuy on strat = " + priceOnBuy);
    console.log("strat sellDate " + res.sellDateArr);
    console.log("strat buyDate " + res.buyDateArr);


    const suggestions = []


   if (currentDate === res.buyDateArr) {

        // gives back the number of stocks to buy 
        const stockstoPurchase = Utils.maxStockPurchases(stockData[currentDate].markPrice, portfolio.getCash)
        console.log('buying ' + amtToPurchase + ' stocks on ' + buyDate);

        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, stockstoPurchase));
        console.log("suggestions: = " + suggestions);
    }


return suggestions

}

module.exports = {
    "name": "activeTrading",
    "function": activeTrading
}
