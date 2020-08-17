// invests all your money in the SNP 500 on the first day and waits

const Suggestion = require("./utils/Suggestion")

function buyAndWait(symbol, portfolio, stockData, currentDate) {

    const suggestions = []
    console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`)


    if (currentDate === "2020-01-02") {
        console.log(stockData[currentDate])
        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate))
    }

    return suggestions

}

module.exports = {
    "name": "buyAndWait",
    "function": buyAndWait
}

