var Stock = require("./Stock")

class Portfolio {
    constructor(symbol, investment, startDate) {
        this.symbol = symbol
        this.cash = parseInt(investment)
        this.invested = 0
        this.holdings = []
        this.date = startDate
        this.history = []
    }

    // Each time Portfolio.totalValue is called, it will recalculate the total value bu adding cash and invested values
    get totalValue() {
        return this.cash + this.invested
    }

    addCash(amount) {
        this.cash = parseFloat(this.cash) + parseFloat(amount)
    }

    removeCash(amount) {
        this.cash = parseFloat(this.cash) - parseFloat(amount)
    }

    addInvested(amount) {
        this.invested = parseFloat(this.invested) + parseFloat(amount)
    }

    removeInvested(amount) {
        this.invested = parseFloat(this.invested) + parseFloat(amount)
    }

    // Refreshes the porfolio with a new date
    newDate(date) {
        this.date = date
        this.updateHoldings(date)
        this.saveHistory()
    } 
    
    // This function saves a snapshot of the portfolio in time to the portfolio history
    saveHistory() {
        this.history.push({date: this.date, totalValue: this.totalValue})
    }

    // This function updates the value of each stock in the portfolio for a given day.
    updateHoldings(date) {
        this.invested = 0
        for (const stock of this.holdings) {
            stock.updateData(date)
            this.addInvested(stock.markPrice)
        }
    }

    // This function takes in a stock object in the portfolio.holdings and sells it
    sellStock(stock) {
        this.removeInvested(stock.markPrice)
        this.holdings.filter(holding => holding !== stock)
        this.addCash(stock.markPrice)
    }

    // This function takes in a newly instantiated stock object and "buys" it
    buyStock(stock) {
        this.holdings.push(stock)
        this.addInvested(stock.markPrice)
        this.removeCash(stock.markPrice)
    }

    // This function sells all holdings in the portfolio
    sellAllholdings() {
        for (const stock of this.holdings) {
            this.sellStock(stock)
        }
    }
}

module.exports = Portfolio

