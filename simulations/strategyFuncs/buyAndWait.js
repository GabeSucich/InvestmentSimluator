// invests all your money on the first day then waits

const Suggestion = require("./utils/Suggestion")

function buyAndWait(symbol, portfolio, stockData, currentDate) {

    const suggestions = []
    var cashCopy = portfolio.getCash
    console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`)


    while (stockData[currentDate]["markPrice"] < cashCopy) {
        console.log("Suggesting to buy another share")
        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate))
        cashCopy -= stockData[currentDate]["markPrice"]
    }

    return suggestions

}

module.exports = {
    "name": "buyAndWait",
    "function": buyAndWait
}

