function decreasePercent(simulations, percentArr) {
    console.log(simulations)
    for (const index in simulations) {
        console.log(index)
        const simulation = simulations[index]
        for (const dataPoint of simulation.portfolioHistory) {
            var value = eval(dataPoint.totalValue)
            var newValue = value * (1 - .01*percentArr[index]);
            dataPoint.totalValue = newValue;
        }
        simulation.finalValue = simulation.portfolioHistory[simulation.portfolioHistory.length - 1].totalValue
       
    }
    return simulations
}

const modifiers = {
    "decreasePercent": decreasePercent
}

export default modifiers