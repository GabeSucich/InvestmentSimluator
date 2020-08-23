const Stock = require("../../Stock")

const Suggestion = {
    createBuySuggestion(symbol, stockData, currentDate, quantity=1) {
        if (quantity < 1){
            return 
        }
        const newStock = new Stock(symbol, stockData[currentDate], quantity)
        return {action: "buy", stock: newStock, quantity: quantity}
    },

    createSellSuggestion(stockToSell, quantity="all") {
        if (quantity < 1 ){
            return
        }
        return {action: 'sell', stock: stockToSell, quantity:quantity}
    }
}

module.exports = Suggestion