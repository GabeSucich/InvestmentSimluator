const Historicals = require("../controllers/stockcontroller")
const Portfolio = require("./Portfolio")
const API = require("../utils/API")
const DateUtils = require("../utils/dateUtils")
const Calendar = require("./Calendar")
const Stock = require("./Stock")

class Simulation {

    constructor(symbol, startDate, endDate, investment, strategyFunc, strategyParams = []) {
        this.symbol = symbol;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentDate = null
        this.previousDate = null
        this.investment = investment
        this.strategyFunc = strategyFunc
        this.strategyParams = strategyParams
        return this.gatherAsyncData()
    }

    // Here, we return a promise which will gather all the necessary data we need for our simulation.
    // The code is split into two functions to make it more readable.


    // This functoin checks to see if data for this stock already exists in our mongoDB. 
    // If it does, we will retrieve it. Otherwise, we will create a new document with our API call.
    gatherAsyncData() {

        return Historicals.findHistory(this.symbol).then(databaseData => {

            if (!databaseData) {
                return API.getStockData(this.symbol).then(response => {
                    // Parse out the data from the API call
                    var reversedHistoricals = response.data["Time Series (Daily)"]
                    // Remove the periods from the keys of the historical data. Mongo doesnt like the character "." in object keys.
                    var historicals = DateUtils.processHistoricals(reversedHistoricals)
                    return Historicals.createHistory(this.symbol, historicals).then(result => {
                        // Add this stock data to our database for the future, and then move on with object construction
                        return this.setBoundedHistory(result.historicals)
                    })

                })
            }
            else {
                // If the database already exists, we grab the historical data and proceed.
                return this.setBoundedHistory(databaseData.historicals)
            }
        })
    }

    // This function will trim the historical data so it only contains dates between the start and and date passed into the constructor.
    // After we get this bounded historical data, it's also going to instantiate the other objects that we need for our simulation
    setBoundedHistory(historicalData) {

        // The bounded historical data is an attribute on our simulation object
        this.stockData = DateUtils.boundHistoricals(historicalData, this.startDate, this.endDate)
        this.breakDate = DateUtils.findBreakDate(this.stockData, this.startDate)
        // We create a new Portfolio object to keep track of our holdings over time. This portfolio object belongs to the simulation.
        this.portfolio = new Portfolio(this.symbol, this.investment, this.stockData, this.startDate)
        // This calendar object will help us to run through all the relevant dates. It also belongs to the simulation.
        this.calender = new Calendar(this.stockData)
        // Out of our constructor's promise we return the object itself. This will allow us to add a callback function to the instantiation of simulations,
        // so that our program does not jump ahead before these constructions are complete.
        return this

    }

    // -----------------------------------------------------------------------------------------------------------------------------------------------
    // Now, we define methods to control running the simulation

    // Updates the portfolio for a new date in the simulation
    updatePortfolio() {
        this.portfolio.newDate(this.currentDate)
    }

    // Starts the simulation by calling to simulation the first day
    runSimulation() {
        console.log(this.breakDate);
        return new Promise((resolve, reject) => {
            resolve(this.simulation())
        })
    }

    // Sets the current date to the next date in the timeline interator

    simulation() {
        this.currentDate = this.calender.getNextDate()
        while (this.currentDate) {

            if (this.previousDate) {
                this.checkForSplits()
            }
            
            this.updatePortfolio()




            var strategySuggestions = this.strategyFunc(...this.strategyParams, this.symbol, this.portfolio, this.stockData, this.currentDate)
            this.processSuggestions(strategySuggestions)

            this.previousDate = this.currentDate
            this.currentDate = this.calender.getNextDate()

        }

        return this

    }

    checkForSplits() {

        var currentPrice = eval(this.stockData[this.currentDate].markPrice)
        var previousPrice = eval(this.stockData[this.previousDate].markPrice)
        var intraDayRatio = currentPrice / previousPrice

        if (intraDayRatio >= 1.8) {
            console.log("ReverseSplit")
            this.handleReverseSplit(currentPrice, previousPrice)
        }
        else if (intraDayRatio <= .6) {
            console.log("Split")
            console.log(this.currentDate, currentPrice, previousPrice, intraDayRatio)
            this.handleSplit(currentPrice, previousPrice)
        }
        else {
            return
        }

        return

    }

    handleSplit(currentPrice, previousPrice) {
        const splitRatio = (previousPrice / currentPrice).toFixed()

        this.portfolio.adjustForSplit(splitRatio, this.currentDate)

    }

    handleReverseSplit(currentPrice, previousPrice) {
        const splitRatio = (currentPrice / previousPrice).toFixed()
        this.portfolio.adjustForReverseSplit(splitRatio, this.previousDate, this.currentDate)
    }

    processSuggestions(strategySuggestions) {
        if (strategySuggestions.length > 0) {
            for (const suggestion of strategySuggestions) {

                // If the strategy function is suggesting a buy
                if (suggestion.action === "buy") {
                    this.handleBuy(suggestion)
                }

                // If the strategy function is suggesting a sell
                else if (suggestion.action === "sell") {
                    this.handleSell(suggestion)
                }
            }
        }

        this.portfolio.saveHistory()
    }


    // Instantiate a new stock to buy for each suggestion
    handleBuy(suggestion) {
        this.portfolio.buyStock(suggestion.stock, suggestion.quantity)
    }

    // Sell a stock if suggested
    handleSell(suggestion) {
        this.portfolio.sellStock(suggestion.stock, suggestion.quantity)
    }

}

module.exports = Simulation
