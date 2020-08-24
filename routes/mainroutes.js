var SimControl = require("../simulations/SimControl")
var path = require("path")
const API = require("../utils/API")
const DateUtils = require("../utils/dateUtils")
const Historicals = require("../controllers/stockcontroller")
const ActiveDateUtils = require('../utils/activeTradingDates');
const StockHistory = require("../models/StockHistory")

module.exports = function (app) {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/index.html"))
    })

    // This is a basic api call for simulation data. In the request comes the information needed to create a simulation. 
    //The simulation is instantiated and run, and the data is sent back to the client
    app.post('/api/simulation/new', (req, res) => {
        const { symbol, startDate, endDate, investment, strategyFuncName, strategyParams } = req.body
        const simControl = new SimControl(symbol, startDate, endDate, investment, strategyFuncName, strategyParams)
        simControl.runSimulation().then(data => {
                res.json(simControl.simulationResult)
        })
    })

    app.post("/api/simulation/getIntervalDates", (req, res) => {
        const { symbol, startDate, endDate, interval } = req.body

        Historicals.findHistory(symbol).then(databaseData => {
            if (!databaseData) {
                API.getStockData(symbol)
                    .then(response => {
                        const reversedHistoricals = response.data["Time Series (Daily)"]
                        var historicals = DateUtils.processHistoricals(reversedHistoricals)
                        const resultDates = DateUtils.findIntervalDates(historicals, startDate, endDate, interval)
                        Historicals.createHistory(symbol, historicals).then(data => {
                            res.json(resultDates);
                        })
                        
                    })
            }
            else {
                console.log("Grabbing from database")
                const historicals = databaseData.historicals
                const resultDates = DateUtils.findIntervalDates(historicals, startDate, endDate, interval)
                res.json(resultDates)
            }

        })
    })

    app.post("/api/simulation/getBuyDate", (req, res) => {
        const { symbol, startDate, endDate, percent } = req.body
        console.log("main routes percent = " + percent)
        Historicals.findHistory(symbol).then(databaseData => {
            if (!databaseData) {
                API.getStockData(symbol)
                    .then(response => {
                        const reversedHistoricals = response.data["Time Series (Daily)"]
                        var historicals = DateUtils.processHistoricals(reversedHistoricals);
                        const resultDate = DateUtils.findBuyDate(historicals, startDate, endDate, percent);
                        Historicals.createHistory(symbol, historicals).then(data => {
                            res.json(resultDate);
                        })
                        
                    })
            }
            else {
                console.log("Grabbing from database")
                const historicals = databaseData.historicals
                const resultDate = DateUtils.findBuyDate(historicals, startDate, endDate, percent);
                res.json(resultDate);
            }

        })
    })

    app.post("/api/simulation/activeTrading", (req, res) => {
        const { startDate, endDate, symbol, blPerc, bhPerc, slPerc, shPerc } = req.body;
        Historicals.findHistory(symbol).then(databaseData => {
            if(!databaseData) {
                API.getStockData(symbol)
                .then(response => { 
                    const reversedHistoricals = response.data["Time Series (Daily)"];
                    var historicals = DateUtils.processHistoricals(reversedHistoricals);
                    const resultDates = ActiveDateUtils.activeTrading(historicals, startDate, endDate, symbol, blPerc, bhPerc, slPerc, shPerc);
                    res.json(resultDates);
                })
            }
        })
    })

}