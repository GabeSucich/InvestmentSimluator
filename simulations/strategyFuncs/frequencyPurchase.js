import Stock from "../Stock";

// buys the given stock whenever you have enough cash and increments your cash by a given amount after every 20 market days
const Suggestion = require("./utils/Suggestion")

// 
function frequencyPurchase(savedAmt, actionDates, symbol, portfolio, stockData, currentDate) {

    // takes total amt to be invested and divides it equally into action dates
    var amtPerPurchase  = savedAmt / actionDates.length;
    console.log('amt per purchase = ' + amtPerPurchase);

    // finds daily value of Stock
    var currStockVal = Stock.markPrice();

    const suggestions = []

    // checks if current date is in range
    if (actionDates.includes(currentDate)) {

       // checks if amount per Purchase can afford price of stock
       if (amtPerPurchase > currStockVal) {
        console.log(`investing another $${amtPerPurchase} into the portfolio`);
        portfolio.increaseCash(amtPerPurchase)
       } else {
           console.log('sorry, not enough money to make purchase.')
       }
    }

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
    "name": "frequencyPurchase",
    "function": frequencyPurchase
}
