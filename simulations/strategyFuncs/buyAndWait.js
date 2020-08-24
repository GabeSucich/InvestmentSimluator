// invests all your money on the first day then waits

const Suggestion = require("./utils/Suggestion")
const Utils = require("./utils/Utils")

function buyAndWait(symbol, portfolio, stockData, currentDate) {

    const suggestions = []
    
    if (!portfolio.purchased) {
        console.log("Looking to buy")
        portfolio.purchased = true
        const stockstoPurchase = Utils.maxStockPurchases(stockData[currentDate].markPrice, portfolio.getCash)
        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, stockstoPurchase))

    }

    return suggestions

}

module.exports = {
    "name": "buyAndWait",
    "function": buyAndWait
}

