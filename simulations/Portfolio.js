var Stock = require("./Stock")

class Portfolio {
    constructor(symbol, investment, stockData, startDate) {
        this.symbol = symbol
        this.cash = parseInt(investment)
        this.stockData = stockData
        this.invested = 0
        this.holdings = []
        this.date = startDate
        this.history = []
    }

    // Each time Portfolio.totalValue is called, it will recalculate the total value bu adding cash and invested values
    get totalValue() {
        return this.cash + this.invested
    }

    get getCash() {
        return this.cash;
    }

    increaseCash(amount) {
        this.cash = eval(this.cash) + eval(amount)
    }

    decreaseCash(amount) {
        this.cash = eval(this.cash) - eval(amount)
    }

    increaseInvested(amount) {
        this.invested = eval(this.invested) + eval(amount)
    }

    decreaseInvested(amount) {
        this.invested = eval(this.invested) - eval(amount)
    }


    // Refreshes the porfolio with a new date
    newDate(date) {
        this.date = date
        this.updateHoldings(date)
    }

    // This function saves a snapshot of the portfolio in time to the portfolio history
    saveHistory() {
        this.history.push({ date: this.date, totalValue: this.totalValue })
    }

    // This function updates the value of each stock in the portfolio for a given day.
    updateHoldings(date) {
        this.invested = 0
        const currentData = this.stockData[date]
        for (const stock of this.holdings) {
            stock.updateData(currentData)
            this.increaseInvested(stock.markPrice)
        }
    }

    // This function takes in a stock object in the portfolio.holdings and sells it
    sellStock(stock) {

        if (!this.holdings.includes(stock)) {
            console.log("Stock cannot be sold if it is not owned")
            return
        }

        this.decreaseInvested(stock.markPrice)
        this.holdings = this.holdings.filter(holding => holding !== stock)
        this.increaseCash(stock.markPrice)
    }

    // This function takes in a newly instantiated stock object and "buys" it
    buyStock(stock) {
        if (this.cash <= stock.markPrice) {
            console.log("Not enough cash to buy this stock")
            return
        }
        this.holdings.push(stock)
        this.increaseInvested(stock.markPrice)
        this.decreaseCash(stock.markPrice)
    }



    // This function sells all holdings in the portfolio
    sellAllholdings() {
        for (const stock of this.holdings) {
            this.sellStock(stock)
        }
    }


    adjustForSplit(splitRatio, currentDate) {
        const originalLength = this.holdings.length
        const currentStockPrice = eval(this.holdings[0].markPrice)
        for (var i=0; i< originalLength; i++) {
            for (var j = 1; j < splitRatio; j++) {
                this.increaseCash(currentStockPrice)
                this.buyStock(new Stock(this.symbol, this.stockData[currentDate]))
            }
        }
    }

    adjustForReverseSplit(splitRatio, previousDate) {
        const originalLength = this.holdings.length
        const convertedStocks = Math.floor(originalLength/splitRatio)
        const unconvertedStocks = originalLength % unconvertedStocks
        this.increaseCash(eval(unconvertedStocks*this.stockData[previousDate].markPrice))
        this.portfolio.holdings = this.portfolio.holdings.slice(0, convertedStocks)


    }
}

module.exports = Portfolio

