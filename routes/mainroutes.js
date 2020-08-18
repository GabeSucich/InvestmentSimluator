var SimControl = require("../simulations/SimControl")
var path = require("path")
const API = require("../simulations/utils/API")
const Utils = require("../simulations/utils/dateUtils")
const Historicals = require("../controllers/stockcontroller")

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
                        const historicals = response.data["Time Series (Daily)"]
                        const resultDates = Utils.findIntervalDates(historicals, startDate, endDate, interval)
                        Utils.processHistoricals(historicals)
                        Historicals.createHistory(symbol, historicals).then(data => {
                            res.json(resultDates);
                        })
                        
                    })
            }
            else {
                console.log("Grabbing from database")
                const historicals = databaseData.historicals
                const resultDates = Utils.findIntervalDates(historicals, startDate, endDate, interval)
                res.json(resultDates)
            }

        })
    })


}