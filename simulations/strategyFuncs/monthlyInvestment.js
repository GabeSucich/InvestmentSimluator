// buys the given stock whenever you have enough cash and increments your cash by a given amount every month

const Suggestion = require("./utils/Suggestion")

function monthlyInvestment(monthlyAmount, symbol, portfolio, stockData, currentDate) {

    const suggestions = []

    if (typeof dayCounter === "undefined") {
        dayCounter = 0;
        investmentCounter = 0;
    }

    if (dayCounter === 20) {
        console.log(`investing another $${monthlyAmount} into the portfolio`);
        portfolio.increaseCash(monthlyAmount)
        dayCounter = 0;
        investmentCounter += 1;
    } else {
        dayCounter += 1;
    }

    var cashCopy = portfolio.getCash
    console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`)

    while (stockData[currentDate]["markPrice"] < cashCopy) {
        console.log("Suggesting to buy another share")
        suggestions.push(Suggestion.createBuySuggestion(symbol, stockData, currentDate))
        cashCopy -= stockData[currentDate]["markPrice"]
    }

    var moneyInvested = investmentCounter * monthlyAmount;
    console.log(`money you've invested: ${moneyInvested}`)

    var profit = portfolio.totalValue - 10000 - moneyInvested;
    console.log(`total profit: ${profit}`)

    return suggestions

}

module.exports = {
    "name": "monthlyInvestment",
    "function": monthlyInvestment
}

