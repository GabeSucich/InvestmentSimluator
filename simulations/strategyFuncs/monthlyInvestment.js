// buys the given stock whenever you have enough cash and increments your cash by a given amount after every 20 market days
const Suggestion = require("./utils/Suggestion")

function monthlyInvestment(monthlyAmount, actionDates, symbol, portfolio, stockData, currentDate) {

    const suggestions = []

    if (actionDates.includes(currentDate)) {
        // console.log(`investing another $${monthlyAmount} into the portfolio`);
        portfolio.increaseCash(eval(monthlyAmount))
    }

    var cashCopy = portfolio.getCash
    // console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`)
    

    while (eval(stockData[currentDate]["markPrice"]) < cashCopy) {
        // console.log("Suggesting to buy another share")
        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate))
        cashCopy -= stockData[currentDate]["markPrice"]
    }

    return suggestions

}

module.exports = {
    "name": "monthlyInvestment",
    "function": monthlyInvestment
}

