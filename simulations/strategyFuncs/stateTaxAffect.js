const Suggestion = require("./utils/Suggestion")

function stateTaxAffect(stateTaxRate1, StateTaxRate2, symbol, portfolio, stockData, currentDate) {
//     // Always have the final four parameters of your function as shown above

    var suggestionsArr = []

//     // Work/logic goes here
if (currentDate === "2005-01-03") {
    suggestionsArr.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate))

}

if (currentDate === "2020-06-01") {
    suggestionsArr.push(Suggestion.createSellSuggestion(portfolio.holdings[0]))
}


    return suggestionsArr

}

module.exports = {

    "name": "stateTaxAffect",
    "function": stateTaxAffect
}