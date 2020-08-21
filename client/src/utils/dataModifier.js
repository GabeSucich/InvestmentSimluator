function decrease5Percent(simulations) {
    // for (const simulation of simulations) {
        for (const dataPoint of simulations[1].portfolioHistory) {
            var value = eval(dataPoint.totalValue)
            var newValue = value * 0.87;
            dataPoint.totalValue = newValue;
        }
        simulations[1].totalValue = simulations[1].portfolioHistory[simulations[1].portfolioHistory.length - 1].totalValue
        return simulations
    // }
}

const modifiers = {
    "decrease5Percent": decrease5Percent
}

export default modifiers