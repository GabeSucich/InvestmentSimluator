const Stock = require("../../Stock")

const Suggestion = {
    createBuySuggestion(symbol, stockData, currentDate, quantity=1) {
        // console.log(stockData[currentDate])
        const newStock = new Stock(symbol, stockData[currentDate], quantity)
        return {action: "buy", stock: newStock, quantity: quantity}
    },

    createSellSuggestion(stockToSell, quantity="all") {
        return {action: 'sell', stock: stockToSell, quantity:quantity}
    }
}

module.exports = Suggestion