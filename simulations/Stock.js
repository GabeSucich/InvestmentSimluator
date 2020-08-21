class Stock {

    constructor(symbol, startData, quantity=1) {
        this.symbol = symbol
        this.currentData = startData
        this.purchaseCost = this.markPrice
        this.quantity = quantity
    }

    // This will set the current data of the stock equal to that found in the stock history
    updateData(data) {
        this.currentData = data
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
    get percentChange() {
        return (100*(this.markPrice - this.purchaseCost)/this.purchaseCost).toFixed(2)
    }
    

}

module.exports = Stock