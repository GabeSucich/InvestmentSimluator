const Suggestion = require("./utils/Suggestion");
const Utils = require("./utils/Utils");

const activeUtils = {

    // finds 5% dip and buys with all money 
    buyLow(buyDate, priceOnBuy, symbol, portfolio, stockData, currentDate) {

        // console library.
        // console.log('buyLow running');
        // console.log('strat investAmt = ' + investmentAmt);
        // console.log("buyDate on strat = " + buyDate);
        // console.log("priceOnBuy on strat = " + priceOnBuy);


        const suggestions = []


        if (currentDate === buyDate) {

            // gives back the number of stocks to buy 
            var amtToPurchase = Utils.maxStockPurchases(priceOnBuy, portfolio.getCash);
            console.log('buying ' + amtToPurchase + ' stocks on ' + buyDate);

            suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, amtToPurchase));
        }
        return suggestions

    }

}

module.exports = activeUtils; 