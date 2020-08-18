const Historicals = require("../controllers/stockcontroller")
const Portfolio = require("./Portfolio")
const API = require("./utils/API")
const Utils = require("./utils/dateUtils")
const Calendar = require("./Calendar")
const Stock = require("./Stock")

class Simulation {

    constructor(symbol, startDate, endDate, investment, strategyFunc, strategyParams = []) {
        this.symbol = symbol;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentDate = startDate
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
                    var historicals = response.data["Time Series (Daily)"]
                    // Remove the periods from the keys of the historical data. Mongo doesnt like the character "." in object keys.
                    Utils.processHistoricals(historicals)
                    return StockHistory.create(this.symbol, historicals).then(result => {
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

        const boundedHistoryArr = []

        // This boolean flag will help us to not iterate over giant portions of unnecessary data after get get the historicals we need
        var foundTimeInterval = false

        // We are going to iterate through each date in the historical data. If it is within the date interval, we will add it.
        for (const [date, stockData] of Object.entries(historicalData)) {
            if (Utils.isInRange(this.startDate, this.endDate, date)) {
                boundedHistoryArr.push({ date: date, data: stockData })
                foundTimeInterval = true
            }

            // When we step out of time interval, this statement will break us out of the loop. If we are looking for data between 2010 and 2020,
            //  this flag will stop us from unnecessary iterating over all the dates between 1999 and 2009 in the historical data.
            else if (foundTimeInterval) {
                break
            }
        }

        const boundedHistory = {}

        // We read the data from the API call in reverse chronological order. Here, we reverse this order
        for (var i = boundedHistoryArr.length - 1; i >= 0; i--) {
            var dataPoint = boundedHistoryArr[i]
            boundedHistory[dataPoint.date] = dataPoint.data
        }


        // The bounded historical data is an attribute on our simulation object
        this.stockData = boundedHistory
        this.breakDate = Utils.findBreakDate(this.stockData, this.startDate)
        console.log(this.breakDate)
        // We create a new Portfolio object to keep track of our holdings over time. This portfolio object belongs to the simulation.
        this.portfolio = new Portfolio(this.symbol, this.investment, this.startDate)
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
        this.simulateNextDay()
    }

    // Sets the current date to the next date in the timeline interator
    simulateNextDay() {
        this.currentDate = this.calender.getNextDate()

        // If there are no more dates in the timeline, the simulaiton is finished
        if (!this.currentDate) {
            console.log("Simulation completed")
            return this
        }

        else if (this.currentDate === this.breakDate) {
            setTimeout(() => {
                this.updatePortfolio()
                var strategySuggestions = this.strategyFunc(...this.strategyParams, this.symbol, this.portfolio, this.stockData, this.currentDate)
                this.processSuggestions(strategySuggestions)
            }, 20)
        }
        // Otherwise,the portfolio is updated, and strategy function is called on the simulation
        else {
            this.updatePortfolio()
            var strategySuggestions = this.strategyFunc(...this.strategyParams, this.symbol, this.portfolio, this.stockData, this.currentDate)
            // The strategy function returns specially-formatted suggestions which the simulation can process
            this.processSuggestions(strategySuggestions)
        }
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
        this.simulateNextDay()
    }


    // Instantiate a new stock to buy for each suggestion
    handleBuy(suggestion) {
        this.portfolio.buyStock(suggestion.stock)
    }

    // Sell a stock if suggested
    handleSell(suggestion) {
        this.portfolio.sellStock(suggestion.stock)
    }

}

module.exports = Simulation
