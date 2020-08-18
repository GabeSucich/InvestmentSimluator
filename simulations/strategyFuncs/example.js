const Suggestion = require("./utils/Suggestion")

function example(tax1, tax2, tax3, symbol, portfolio, stockData, currentDate) {

    var suggestionsArr = []

    if (currentDate === "2020-04-29") {
        suggestionsArr.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate))
    
    }

    if (currentDate === "2020-05-20") {
        suggestionsArr.push(Suggestion.createSellSuggestion(portfolio.holdings[0]))
    }

    return suggestionsArr

}

module.exports = {
    "name": "example",
    "function": example
}


