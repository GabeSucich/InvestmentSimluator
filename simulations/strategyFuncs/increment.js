function incrementer(symbol, portfolio, stockData, currentDate) {
    portfolio.increaseCash(1)
    console.log(portfolio.totalValue)
    return []
}

module.exports = {
    "name": "Incrementer",
    "function": incrementer
}

