const Suggestion = require("./utils/Suggestion");
// finds 5% dip and buys with all money 
function activeTrading(res, symbol, portfolio, stockData, currentDate) {

    // console library.
    // console.log('buyLow running');
    // console.log('strat investAmt = ' + investmentAmt);
    // console.log("buyDate on strat = " + buyDate);
    // console.log("priceOnBuy on strat = " + priceOnBuy);
    console.log(res.sellDateArr);
    console.log(res.buyDateArr);


    const suggestions = []


//    if (currentDate === buyDate) {

//         // gives back the number of stocks to buy 
//         var amtToPurchase = Utils.maxStockPurchases(priceOnBuy, portfolio.getCash);
//         console.log('buying ' + amtToPurchase + ' stocks on ' + buyDate);

//         suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, amtToPurchase));
//     }
// return suggestions

}

module.exports = {
    "name": "activeTrading",
    "function": activeTrading
}
