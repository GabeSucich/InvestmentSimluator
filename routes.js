var SimControl = require("./simulations/SimControl")
var path = require("path")

module.exports = function(app) {

    app.get("/gabeTest", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/index.html"))
    })

    // This is a basic api call for simulation data. In the request comes the information needed to create a simulation. 
    //The simulation is instantiated and run, and the data is sent back to the client
    app.post('/api/simulation/new', (req, res) => {
        var d = req.body;
        const simControl = new SimControl(d.symbol, d.startDate, d.endDate, d.investment, d.strategyFuncName, d.strategyParams)
        simControl.runSimulation().then(data => {
            res.json(simControl.portfolio)
        })
    })




}