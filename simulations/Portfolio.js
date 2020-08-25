var Stock = require("./Stock")

class Portfolio {
    constructor(symbol, investment, stockData, startDate) {
        console.log("Portfolio investment: " + investment)
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
            this.increaseInvested(stock.markPrice*stock.quantity)
        }
    }

    // This function takes in a stock object in the portfolio.holdings and sells it
    sellStock(stock, quantity="all") {

        if (!this.holdings.includes(stock)) {
            console.log("Stock cannot be sold if it is not owned")
            return
        }

        else if (quantity === "all" || quantity === stock.quantity) {
            this.decreaseInvested(stock.quantity*stock.markPrice)
            this.holdings = this.holdings.filter(holding => holding !== stock)
            this.increaseCash(stock.markPrice*stock.quantity)
        }

        else {
            if (quantity > stock.quantity) {
                console.log("Cannot sell more stock than you have")
                return
            }
            this.decreaseInvested(quantity*stock.markPrice)
            stock.quantity -= quantity
            this.increaseCash(quantity*stock.markPrice)
        }        
        
    }

    // This function takes in a newly instantiated stock object and "buys" it
    buyStock(stock) {
        if (this.cash <= stock.markPrice) {
            console.log("Not enough cash to buy this stock")
            return
        }
        this.holdings.push(stock)
        this.increaseInvested(stock.markPrice*stock.quantity)
        this.decreaseCash(stock.markPrice*stock.quantity)
    }



    // This function sells all holdings in the portfolio
    sellAllholdings() {
        for (const stock of this.holdings) {
            this.sellStock(stock)
        }
    }


    adjustForSplit(splitRatio, currentDate) {
        if (this.holdings[0]) {
           const currentStockPrice = eval(this.holdings[0].markPrice) 
        }
        for (const stock of this.holdings) {
            stock.quantity *= splitRatio
        }
        this.updateHoldings(currentDate)
    }

    adjustForReverseSplit(splitRatio, previousDate, currentDate) {
        var totalStock = 0
        for (const stock of this.holdings) {
            totalStock += stock.quantity
        }
        const convertedStocks = Math.floor(totalStock/splitRatio)
        this.holdings = []
        this.decreaseInvested(eval(totalStock*eval(this.stockData[previousDate].markPrice)))
        this.increaseCash(eval(totalStock*eval(this.stockData[previousDate].markPrice)))
        const currentData = this.stockData[currentDate]
        this.buyStock(new Stock(this.symbol, currentData, convertedStocks))


    }
}

module.exports = Portfolio

