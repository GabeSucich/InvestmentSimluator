class Stock {

    constructor(symbol, history, currentDate) {
        this.symbol = symbol
        this.history = history
        this.updateData(currentDate)
    }

    // This will set the current data of the stock equal to that found in the stock history
    updateData(date) {
        this.currentData = this.history[date]
    }


    // These are various getters for analyzing the stock
    get openPrice() {
        return eval(this.currentData.open)
    }
    get closePrice() {
        return eval(this.currentData.close)
    }
    get highPrice() {
        return eval(this.currentData.high)
    }
    get lowPrice() {
        return eval(this.currentData.low)
    }
    get markPrice() {
        return (this.openPrice + this.closePrice)/2
    }

}

module.exports = Stock