const Utils = {


    maxStockPurchases(stockPrice, cashAmt) {
        return Math.floor(eval(cashAmt)/eval(stockPrice));
    },
}

module.exports = Utils;