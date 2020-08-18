var Simulation = require("./Simulation")
var strategies = require("./strategyFuncs")

class SimControl {

    constructor(symbol, startDate, endDate, investment, strategyFuncName, strategyParams = []) {
        this.strategyFunc = strategies[strategyFuncName]
        this.strategyParams = strategyParams
        this.simulationPromise = new Simulation(symbol, startDate, endDate, investment, this.strategyFunc, this.strategyParams)
        this.simulation = null
    }

    runSimulation() {
        return this.simulationPromise.then(simulation => {
            console.log("running simulation")
            simulation.runSimulation()
            this.simulation = simulation
        })
    }

    get portfolio() {
        if (this.simulation) {
            return this.simulation.portfolio
        }
        
    }

    get simulationResult() {
        if (!this.simulation) {
            console.log("Simulation has not been run or is not complete")
            return null
        }

        return {
            finalValue: this.portfolio.totalValue,
            portfolioHistory: this.portfolio.history
        }
    }


}

module.exports = SimControl
