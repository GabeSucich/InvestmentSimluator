
// A basic API call which shows that a simulation can be created using these API routes. 
// Run the server in the server.js file and open localhost:3000 to see the result in the console

function runStrategy(symbol, startDate, endDate, interval) {
    const object = { symbol: symbol, startDate: startDate, endDate: endDate, interval: interval };
    $.ajax({
        method: "POST",
        url: "/api/simulation/getIntervalDates",
        data: object
    })
        .then(actionDates => {
            console.log("action dates is: " + actionDates)
            $.ajax({
                method: "POST",
                url: "/api/simulation/new",
                data: {
                    symbol: symbol,
                    startDate: startDate,
                    endDate: endDate,
                    investment: 100,
                    strategyFuncName: "monthlyInvestment",
                    strategyParams: [10, actionDates]
                }
            }).then(result => {
                console.log(result)
            })
        })
}

runStrategy("SPY", "2018-08-01", "2020-08-01", 10)