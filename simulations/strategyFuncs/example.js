const Suggestion = require("./utils/Suggestion")

function example(a, b, c, symbol, portfolio, stockData, currentDate) {

    const suggestions = []
    console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`)

    if (currentDate === "2020-04-29") {
        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate))
    }

    if (currentDate === "2020-05-29") {
        suggestions.push(Suggestion.createSellSuggestion(portfolio.holdings[0]))
    }

    return suggestions

}

module.exports = {
    "name": "example",
    "function": example
}

