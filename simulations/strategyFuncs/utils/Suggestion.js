const Stock = require("../../Stock")

const Suggestion = {
    createBuySuggestion(symbol, stockData, currentDate) {
        const newStock = new Stock(symbol, stockData, currentDate)
        return {action: "buy", stock: newStock}
    },

    createSellSuggestion(stockToSell) {
        return {action: 'sell', stock: stockToSell}
    }
}

module.exports = Suggestion