// buys the given stock whenever you have enough cash and increments your cash by a given amount after every 20 market days
const Suggestion = require("./utils/Suggestion")
import Utils from "./utils/Utils"

function monthlyInvestment(monthlyAmount, actionDates, symbol, portfolio, stockData, currentDate) {

    const suggestions = []

    if (actionDates.includes(currentDate)) {
        // console.log(`investing another $${monthlyAmount} into the portfolio`);
        portfolio.increaseCash(eval(monthlyAmount))
    }

    // console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`)
    
    const numberOfStocksToPurchase = Utils.maxStockPurchases(stockData[currentDate].markPrice, portfolio.getCash)
    
    if (numberOfStocksToPurchase) {
        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate, Utils.maxStockPurchases(stockData[currentDate].markPrice, portfolio.getCash)))
    }

    return suggestions

}

module.exports = {
    "name": "monthlyInvestment",
    "function": monthlyInvestment
}

