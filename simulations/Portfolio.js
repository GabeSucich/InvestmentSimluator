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

    get cash() {
        return this.cash
    }

    get invested() {
        return this.invested
    }

    set cash(amount) {
        this.cash = parseFloat(amount)
    }

    set invested(amount) {
        this.invested = parseFloat(amount)
    }

    increaseCash(amount) {
        this.cash = parseFloat(this.cash) + parseFloat(amount)
    }

    decreaseCash(amount) {
        this.cash = parseFloat(this.cash) - parseFloat(amount)
    }

    increaseInvested(amount) {
        this.invested = parseFloat(this.invested) + parseFloat(amount)
    }

    decreaseInvested(amount) {
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
        this.history.push({ date: this.date, totalValue: this.totalValue })
    }

    // This function updates the value of each stock in the portfolio for a given day.
    updateHoldings(date) {
        this.invested = 0
        for (const stock of this.holdings) {
            stock.updateData(date)
            this.increaseInvested(stock.markPrice)
        }
    }

    // This function takes in a stock object in the portfolio.holdings and sells it
    sellStock(stock) {
        this.decreaseInvested(stock.markPrice)
        this.holdings.filter(holding => holding !== stock)
        this.addCash(stock.markPrice)
    }

    // This function takes in a newly instantiated stock object and "buys" it
    buyStock(stock) {
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
}

module.exports = Portfolio

