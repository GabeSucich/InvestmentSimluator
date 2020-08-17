const Suggestion = require("./utils/Suggestion")

function example(buyDateArr, symbol, portfolio, stockData, currentDate) {

    var suggestionsArr = []

    console.log("Tax1 is " + tax1 + "%", "Tax2 is " + tax2 + "%", "Tax3 is " + tax3 + "%")

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


