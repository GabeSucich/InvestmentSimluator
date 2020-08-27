const Utils = {


    maxStockPurchases(stockPrice, cashAmt) {
        console.log("Stock price: " + stockPrice)
        console.log("Cash amount " + cashAmt)
        return Math.floor(eval(cashAmt)/eval(stockPrice));
    },
}

module.exports = Utils;