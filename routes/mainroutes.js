var SimControl = require("../simulations/SimControl")
var path = require("path")

module.exports = function(app) {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/index.html"))
    })

    // This is a basic api call for simulation data. In the request comes the information needed to create a simulation. 
    //The simulation is instantiated and run, and the data is sent back to the client
    app.post('/api/simulation/new', (req, res) => {
    const {symbol, startDate, endDate, investment, strategyFuncName, strategyParams} = req.body
        const simControl = new SimControl(symbol, startDate, endDate, investment, strategyFuncName, strategyParams)
        simControl.runSimulation().then(data => {
            res.json(simControl.simulationResult)
        })
    })


}