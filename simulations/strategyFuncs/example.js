const Suggestion = require("./utils/Suggestion")

function example(tax, symbol, portfolio, stockData, currentDate) {

    var suggestionsArr = []

    console.log("Tax is " + tax + "%")
    console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`)

    if (currentDate === "2020-04-29") {
        suggestionsArr.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate))
    }

    if (currentDate === "2020-05-29") {
        suggestionsArr.push(Suggestion.createSellSuggestion(portfolio.holdings[0]))
    }

    return suggestionsArr

}

module.exports = {
    "name": "example",
    "function": example
}

