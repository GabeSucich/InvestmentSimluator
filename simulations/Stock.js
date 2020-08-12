class Stock {
    
    constructor(symbol, history, currentDate) {
        this.symbol = symbol
        this.history = history
        this.currentData = this.updateData(currentDate)
    }

    // This will set the current data of the stock equal to that found in the stock history
    updateData(date) {
        this.currentData = this.history[date]
    }

    // These are various getters for analyzing the stock
    get openPrice() {
        return this.currentData.open
    }
    get closePrice() {
        return this.currentData.close
    }
    get highPrice() {
        return this.currentData.high
    }
    get lowPrice() {
        return this.currentData.low
    }
    get markPrice() {
        return (this.openPrice + this.closePrice)/2
    }

}

module.exports = Stock